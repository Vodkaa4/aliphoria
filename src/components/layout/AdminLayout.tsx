import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Package, 
  BarChart, 
  Settings, 
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  User
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  // Contoh notifikasi
  const notifications = [
    { id: 1, text: 'Pesanan baru #ORD-4235', time: '5 menit yang lalu', read: false },
    { id: 2, text: 'Stok produk "Summer Breeze Maxi Dress" hampir habis', time: '1 jam yang lalu', read: false },
    { id: 3, text: 'Pembayaran berhasil untuk pesanan #ORD-4230', time: '3 jam yang lalu', read: true },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi pencarian di admin panel
    console.log('Searching for:', searchTerm);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:z-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 bg-gray-800 text-white">
            <Link to="/" className="text-xl font-bold">ALIPHORIA</Link>
            <button 
              className="md:hidden" 
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Admin menu */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-gray-700">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-3 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow">
          <div className="px-4 py-4 sm:px-6 md:px-8 flex items-center justify-between">
            <div className="flex items-center">
              <button
                className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-lg md:text-xl font-semibold text-gray-900 ml-2 md:ml-0">
                {navigation.find(item => item.href === location.pathname)?.name || 'Admin Dashboard'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <form onSubmit={handleSearch} className="hidden md:flex">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
              
              {/* Notifications */}
              <div className="relative">
                <button
                  className="p-1 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  aria-label="View notifications"
                >
                  <Bell className="h-6 w-6" />
                  {notifications.some(n => !n.read) && (
                    <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                  )}
                </button>
                
                {/* Notifications dropdown */}
                {notificationsOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-2 px-4 border-b border-gray-100">
                      <h3 className="text-sm font-medium text-gray-900">Notifikasi</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="py-4 px-4 text-sm text-gray-500 text-center">Tidak ada notifikasi</p>
                      ) : (
                        <div className="py-1">
                          {notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`px-4 py-3 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                            >
                              <p className="text-sm text-gray-900">{notification.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="py-1 border-t border-gray-100">
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
                        Lihat semua notifikasi
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  className="flex items-center text-sm rounded-full focus:outline-none"
                  onClick={() => setProfileOpen(!profileOpen)}
                  aria-label="User menu"
                >
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    <User className="h-5 w-5" />
                  </div>
                </button>
                
                {profileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">Admin</p>
                        <p className="text-xs text-gray-500 truncate">admin@aliphoria.com</p>
                      </div>
                      <Link
                        to="/admin/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        Pengaturan
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <Link 
                to="/" 
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                View Store
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;