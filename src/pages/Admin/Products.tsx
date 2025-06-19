import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount_price: number | null;
  category: string;
  subcategory: string;
  images?: string[];
  sizes?: string[];
  colors?: any;
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
  in_stock: boolean;
  created_at: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Error fetching products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus produk ini?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setProducts(products.filter(product => product.id !== id));
      alert('Produk berhasil dihapus');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product. Please try again.');
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manajemen Produk</h1>
        <button
          onClick={() => {
            setCurrentProduct(null);
            setShowAddModal(true);
          }}
          className="bg-black text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Tambah Produk
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Cari produk..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-4">Memuat data produk...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      Tidak ada produk yang ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={product.images && product.images.length > 0 
                                ? product.images[0] 
                                : `https://via.placeholder.com/150?text=${product.name.charAt(0)}`}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">{product.subcategory}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.discount_price ? (
                          <div>
                            <span className="text-sm font-medium text-red-600">Rp {product.discount_price.toLocaleString()}</span>
                            <span className="text-sm text-gray-500 line-through ml-2">Rp {product.price.toLocaleString()}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-900">Rp {product.price.toLocaleString()}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {product.in_stock ? 'Tersedia' : 'Habis'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
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

      {showAddModal && (
        <ProductModal
          product={currentProduct}
          onClose={() => setShowAddModal(false)}
          onSave={() => {
            fetchProducts();
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onSave: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    discount_price: product?.discount_price || '',
    category: product?.category || '',
    subcategory: product?.subcategory || '',
    in_stock: product?.in_stock ?? true,
    images: product?.images || [],
    sizes: product?.sizes || [],
    colors: product?.colors || {},
    tags: product?.tags || [],
    featured: product?.featured || false,
    trending: product?.trending || false,
  });

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else if (name === 'price' || name === 'discount_price') {
      setFormData({
        ...formData,
        [name]: value === '' ? '' : parseFloat(value),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...filesArray]);
      
      // Preview gambar
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageUrls(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (imageFiles.length === 0) return formData.images;
    
    setUploading(true);
    const uploadedUrls: string[] = [];
    
    try {
      for (const file of imageFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `products/${fileName}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
          
        uploadedUrls.push(publicUrl);
      }
      return [...formData.images, ...uploadedUrls];
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error uploading images. Please try again.');
      return formData.images;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Validasi data
      if (!formData.name || !formData.price || !formData.category) {
        alert('Nama, harga, dan kategori harus diisi');
        return;
      }
      
      // Upload gambar terlebih dahulu
      const uploadedImageUrls = await uploadImages();
      
      // Siapkan data untuk disimpan
      const productData = {
        ...formData,
        images: uploadedImageUrls,
        discount_price: formData.discount_price === '' ? null : formData.discount_price,
      };
      
      if (product) {
        // Update produk yang sudah ada
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);
          
        if (error) throw error;
        alert('Produk berhasil diperbarui');
      } else {
        // Tambah produk baru
        const { error } = await supabase
          .from('products')
          .insert([productData]);
          
        if (error) throw error;
        alert('Produk berhasil ditambahkan');
      }
      
      onSave();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          {product ? 'Edit Produk' : 'Tambah Produk Baru'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Produk*
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kategori*
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Pilih Kategori</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Accessories">Accessories</option>
                <option value="Shoes">Shoes</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subkategori
              </label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga*
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                min="0"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Harga Diskon
              </label>
              <input
                type="number"
                name="discount_price"
                value={formData.discount_price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                min="0"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="in_stock"
                name="in_stock"
                checked={formData.in_stock}
                onChange={handleChange}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="in_stock" className="ml-2 block text-sm text-gray-900">
                Tersedia di Stok
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Produk Unggulan
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="trending"
                name="trending"
                checked={formData.trending}
                onChange={handleChange}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label htmlFor="trending" className="ml-2 block text-sm text-gray-900">
                Produk Trending
              </label>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deskripsi
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>
          
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gambar Produk
            </label>
            <div className="mt-1 flex items-center">
              <label className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none">
                <span className="px-4 py-2 border border-gray-300 rounded-md">Pilih Gambar</span>
                <input 
                  type="file" 
                  className="sr-only" 
                  accept="image/*" 
                  multiple 
                  onChange={handleImageChange} 
                  disabled={uploading}
                />
              </label>
              {uploading && <span className="ml-3 text-sm text-gray-500">Mengupload...</span>}
            </div>
            
            {/* Image Preview */}
            {imageUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={url} 
                      alt={`Preview ${index}`} 
                      className="h-24 w-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      aria-label="Remove image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Existing Images (for edit mode) */}
            {product && product.images && product.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-1">Gambar Saat Ini:</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.images.map((url, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={url} 
                        alt={`Product ${index}`} 
                        className="h-24 w-24 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
              disabled={loading || uploading}
            >
              {loading || uploading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Products;