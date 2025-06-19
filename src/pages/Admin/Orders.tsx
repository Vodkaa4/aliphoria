import React, { useState, useEffect } from 'react';
import { Search, Eye, Truck, Check, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  product_name?: string;
}

interface Order {
  id: string;
  user_id: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: {
    name: string;
    address: string;
    city: string;
    postal_code: string;
    phone: string;
  };
  payment_method: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  items?: OrderItem[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      
      // Periksa session terlebih dahulu
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert('Silakan login untuk mengakses halaman ini');
        return;
      }
      
      // Ambil data pesanan
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*, users(full_name)')
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      // Format data pesanan
      const formattedOrders = ordersData.map((order: any) => ({
        ...order,
        user_name: order.users?.full_name || 'Pengguna',
      }));

      setOrders(formattedOrders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Error mengambil data pesanan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetail = async (order: Order) => {
    try {
      // Ambil item pesanan
      const { data: orderItems, error: itemsError } = await supabase
        .from('order_items')
        .select('*, products(name)')
        .eq('order_id', order.id);

      if (itemsError) throw itemsError;

      // Format item pesanan
      const formattedItems = orderItems.map((item: any) => ({
        ...item,
        product_name: item.products?.name || 'Produk',
      }));

      // Set pesanan saat ini dengan item
      setCurrentOrder({
        ...order,
        items: formattedItems,
      });
      
      setShowDetailModal(true);
    } catch (error) {
      console.error('Error fetching order details:', error);
      alert('Error mengambil detail pesanan. Silakan coba lagi.');
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;
      
      // Update state lokal
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      
      if (currentOrder && currentOrder.id === orderId) {
        setCurrentOrder({ ...currentOrder, status: newStatus });
      }
      
      alert('Status pesanan berhasil diperbarui');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error memperbarui status pesanan. Silakan coba lagi.');
    }
  };

  const getStatusBadgeClass = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'Menunggu';
      case 'processing':
        return 'Diproses';
      case 'shipped':
        return 'Dikirim';
      case 'delivered':
        return 'Diterima';
      case 'cancelled':
        return 'Dibatalkan';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Pesanan</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari pesanan..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Memuat data pesanan...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Pesanan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pelanggan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      Tidak ada pesanan yang ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{order.id.substring(0, 8)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.user_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewDetail(order)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                          title="Lihat Detail"
                        >
                          <Eye size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showDetailModal && currentOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detail Pesanan #{currentOrder.id.substring(0, 8)}</h2>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Informasi Pesanan</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="mb-2"><span className="font-medium">ID Pesanan:</span> #{currentOrder.id}</p>
                  <p className="mb-2"><span className="font-medium">Tanggal:</span> {formatDate(currentOrder.created_at)}</p>
                  <p className="mb-2"><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(currentOrder.status)}`}>
                      {getStatusText(currentOrder.status)}
                    </span>
                  </p>
                  <p className="mb-2"><span className="font-medium">Metode Pembayaran:</span> {currentOrder.payment_method}</p>
                  <p><span className="font-medium">Total:</span> {formatCurrency(currentOrder.total_amount)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Informasi Pengiriman</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="mb-2"><span className="font-medium">Nama:</span> {currentOrder.shipping_address.name}</p>
                  <p className="mb-2"><span className="font-medium">Alamat:</span> {currentOrder.shipping_address.address}</p>
                  <p className="mb-2"><span className="font-medium">Kota:</span> {currentOrder.shipping_address.city}</p>
                  <p className="mb-2"><span className="font-medium">Kode Pos:</span> {currentOrder.shipping_address.postal_code}</p>
                  <p><span className="font-medium">Telepon:</span> {currentOrder.shipping_address.phone}</p>
                </div>
              </div>
            </div>

            <h3 className="text-lg font-medium mb-2">Item Pesanan</h3>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ukuran</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warna</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentOrder.items && currentOrder.items.length > 0 ? (
                    currentOrder.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.product_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.color}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatCurrency(item.price)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(item.price * item.quantity)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        Tidak ada item pesanan yang ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdateStatus(currentOrder.id, 'processing')}
                  disabled={currentOrder.status === 'processing' || currentOrder.status === 'shipped' || currentOrder.status === 'delivered' || currentOrder.status === 'cancelled'}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentOrder.status === 'processing' || currentOrder.status === 'shipped' || currentOrder.status === 'delivered' || currentOrder.status === 'cancelled'
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Proses Pesanan
                </button>
                <button
                  onClick={() => handleUpdateStatus(currentOrder.id, 'shipped')}
                  disabled={currentOrder.status !== 'processing'}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentOrder.status !== 'processing'
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  <Truck size={16} className="inline mr-1" />
                  Kirim Pesanan
                </button>
                <button
                  onClick={() => handleUpdateStatus(currentOrder.id, 'delivered')}
                  disabled={currentOrder.status !== 'shipped'}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    currentOrder.status !== 'shipped'
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  <Check size={16} className="inline mr-1" />
                  Tandai Selesai
                </button>
              </div>
              <button
                onClick={() => handleUpdateStatus(currentOrder.id, 'cancelled')}
                disabled={currentOrder.status === 'delivered' || currentOrder.status === 'cancelled'}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentOrder.status === 'delivered' || currentOrder.status === 'cancelled'
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                Batalkan Pesanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;