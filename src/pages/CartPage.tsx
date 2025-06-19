import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft, ShoppingBag } from 'lucide-react';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleQuantityChange = (
    productId: string,
    size: string,
    color: string,
    newQuantity: number
  ) => {
    updateQuantity(productId, size, color, newQuantity);
  };
  
  const handleRemoveItem = (productId: string, size: string, color: string) => {
    if (window.confirm('Are you sure you want to remove this item from your cart?')) {
      removeFromCart(productId, size, color);
    }
  };
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      if (window.confirm('You need to be logged in to checkout. Go to login page?')) {
        navigate('/login');
      }
      return;
    }
    
    navigate('/checkout');
  };
  
  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <ShoppingBag size={64} className="mx-auto mb-6 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-200">
              {cart.items.map((item, index) => (
                <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="p-4 sm:p-6 grid grid-cols-4 gap-4">
                  {/* Product image */}
                  <div className="col-span-1">
                    <Link to={`/product/${item.product.id}`}>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-auto rounded-md"
                      />
                    </Link>
                  </div>
                  
                  {/* Product details */}
                  <div className="col-span-3 md:col-span-2">
                    <Link to={`/product/${item.product.id}`}>
                      <h3 className="text-sm font-medium hover:text-gray-600">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">
                      Size: {item.size} | Color: {item.color}
                    </p>
                    
                    <div className="mt-2">
                      {item.product.discount ? (
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-red-600">
                            ${item.product.discount.toFixed(2)}
                          </span>
                          <span className="ml-2 text-xs text-gray-500 line-through">
                            ${item.product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-medium">
                          ${item.product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    {/* Mobile quantity/remove */}
                    <div className="flex items-center justify-between mt-4 md:hidden">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => handleQuantityChange(
                            item.product.id,
                            item.size,
                            item.color,
                            Math.max(1, item.quantity - 1)
                          )}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(
                            item.product.id,
                            item.size,
                            item.color,
                            Math.max(1, parseInt(e.target.value) || 1)
                          )}
                          className="w-12 h-8 text-center border-x border-gray-300"
                        />
                        <button
                          onClick={() => handleQuantityChange(
                            item.product.id,
                            item.size,
                            item.color,
                            item.quantity + 1
                          )}
                          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.size, item.color)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Quantity and price - desktop */}
                  <div className="hidden md:flex md:col-span-1 flex-col items-end justify-between">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => handleQuantityChange(
                          item.product.id,
                          item.size,
                          item.color,
                          Math.max(1, item.quantity - 1)
                        )}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(
                          item.product.id,
                          item.size,
                          item.color,
                          Math.max(1, parseInt(e.target.value) || 1)
                        )}
                        className="w-12 h-8 text-center border-x border-gray-300"
                      />
                      <button
                        onClick={() => handleQuantityChange(
                          item.product.id,
                          item.size,
                          item.color,
                          item.quantity + 1
                        )}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="flex items-center mt-4">
                      <span className="text-sm font-medium mr-4">
                        ${((item.product.discount || item.product.price) * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.size, item.color)}
                        className="text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 sm:p-6 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear your cart?')) {
                      clearCart();
                    }
                  }}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Clear Cart
                </button>
                <Link
                  to="/"
                  className="text-sm flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                <span>${cart.totalAmount.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="text-gray-600">
                  {cart.totalAmount >= 100 ? 'Free' : '$5.00'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Tax</span>
                <span className="text-gray-600">Calculated at checkout</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>
                  ${(cart.totalAmount + (cart.totalAmount >= 100 ? 0 : 5)).toFixed(2)}
                </span>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
            
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">We Accept</h3>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
                <div className="w-10 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;