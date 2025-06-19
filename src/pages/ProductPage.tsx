import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Truck, RotateCw, Shield } from 'lucide-react';
import Button from '../components/common/Button';
import ProductCard from '../components/common/ProductCard';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  const product = products.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  
  // Get related products (same category)
  const relatedProducts = products
    .filter(p => p.category === product?.category && p.id !== id)
    .slice(0, 4);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </div>
    );
  }
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    
    if (!selectedColor && product.colors.length > 0) {
      alert('Please select a color');
      return;
    }
    
    addToCart(
      product,
      quantity,
      selectedSize,
      selectedColor || product.colors[0].name
    );
    
    // Show confirmation or redirect to cart
    if (window.confirm('Product added to cart. View cart now?')) {
      navigate('/cart');
    }
  };
  
  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product images */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Thumbnail images */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`rounded overflow-hidden border-2 ${
                    currentImage === index ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              {product.category} • {product.subcategory}
            </span>
          </div>
          
          <div className="mb-6">
            {product.discount ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-red-600">
                  ${product.discount.toFixed(2)}
                </span>
                <span className="ml-2 text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Size selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border ${
                    selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-gray-500'
                  } text-sm font-medium transition-colors`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Color selection */}
          {product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-10 h-10 rounded-full transition-transform ${
                      selectedColor === color.name
                        ? 'ring-2 ring-offset-2 ring-black transform scale-110'
                        : ''
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
              {selectedColor && (
                <p className="text-sm mt-2">{selectedColor}</p>
              )}
            </div>
          )}
          
          {/* Quantity selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 h-10 border-t border-b border-gray-300 text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to cart and wishlist buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              icon={<ShoppingBag size={18} />}
            >
              Add to Cart
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={toggleWishlist}
              icon={<Heart size={18} className={isWishlisted ? 'fill-black' : ''} />}
            >
              {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
          
          {/* Shipping info */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <Truck size={20} className="mr-2 text-gray-600" />
                <span className="text-sm">Free shipping over $100</span>
              </div>
              <div className="flex items-center">
                <RotateCw size={20} className="mr-2 text-gray-600" />
                <span className="text-sm">Free 30-day returns</span>
              </div>
              <div className="flex items-center">
                <Shield size={20} className="mr-2 text-gray-600" />
                <span className="text-sm">2-year warranty</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product information tabs */}
      <div className="mb-16">
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-sm font-medium ${
                activeTab === 'description'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`pb-4 text-sm font-medium ${
                activeTab === 'details'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Details & Care
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 text-sm font-medium ${
                activeTab === 'shipping'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              Shipping & Returns
            </button>
          </div>
        </div>
        
        <div>
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
              <ul className="list-disc pl-5 mt-4">
                <li>Premium quality materials</li>
                <li>Thoughtfully designed for comfort and style</li>
                <li>Versatile piece for any wardrobe</li>
              </ul>
            </div>
          )}
          
          {activeTab === 'details' && (
            <div className="prose max-w-none">
              <h3 className="text-lg font-medium mb-2">Product Details</h3>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Material:</strong> 100% Premium Cotton</li>
                <li><strong>Fit:</strong> Regular fit</li>
                <li><strong>Care:</strong> Machine wash cold, tumble dry low</li>
                <li><strong>Origin:</strong> Imported</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-6 mb-2">Size Guide</h3>
              <p className="mb-4 text-gray-600">
                Model is 6'1" and wearing size M.
              </p>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-left border">Size</th>
                    <th className="p-2 text-left border">Chest (in)</th>
                    <th className="p-2 text-left border">Waist (in)</th>
                    <th className="p-2 text-left border">Hip (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border">XS</td>
                    <td className="p-2 border">34-36</td>
                    <td className="p-2 border">28-30</td>
                    <td className="p-2 border">34-36</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">S</td>
                    <td className="p-2 border">36-38</td>
                    <td className="p-2 border">30-32</td>
                    <td className="p-2 border">36-38</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">M</td>
                    <td className="p-2 border">38-40</td>
                    <td className="p-2 border">32-34</td>
                    <td className="p-2 border">38-40</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">L</td>
                    <td className="p-2 border">40-42</td>
                    <td className="p-2 border">34-36</td>
                    <td className="p-2 border">40-42</td>
                  </tr>
                  <tr>
                    <td className="p-2 border">XL</td>
                    <td className="p-2 border">42-44</td>
                    <td className="p-2 border">36-38</td>
                    <td className="p-2 border">42-44</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'shipping' && (
            <div className="prose max-w-none">
              <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
              <p className="text-gray-600 mb-4">
                We offer free standard shipping on all orders over $100. For orders under $100, a flat shipping rate of $5 applies.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Standard Shipping:</strong> 3-5 business days</li>
                <li><strong>Express Shipping:</strong> 1-2 business days (additional fees apply)</li>
              </ul>
              
              <h3 className="text-lg font-medium mt-6 mb-2">Return Policy</h3>
              <p className="text-gray-600 mb-4">
                We want you to be completely satisfied with your purchase. If for any reason you're not happy, you can return your item within 30 days of delivery.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>Items must be unworn, unwashed, and in original packaging</li>
                <li>Returns are free for orders within the United States</li>
                <li>For international orders, customers are responsible for return shipping costs</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Related products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;