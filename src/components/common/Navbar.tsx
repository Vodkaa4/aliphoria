import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Menu, X, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { categories } from '../../data/products';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowSearch(!showSearch);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search submission here
    console.log('Search query:', searchQuery);
    setShowSearch(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Brand logo */}
          <Link to="/" className="font-bold text-2xl">ALIPHORIA</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-sm font-medium hover:text-gray-600 transition-colors"
            >
              Home
            </Link>
            
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="relative"
                onMouseEnter={() => setDropdownOpen(category.id)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <Link 
                  to={`/category/${category.name.toLowerCase()}`}
                  className="text-sm font-medium hover:text-gray-600 transition-colors flex items-center"
                >
                  {category.name}
                  <ChevronDown className="ml-1 w-4 h-4" />
                </Link>
                
                {dropdownOpen === category.id && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-md p-4 w-48 z-10">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        to={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                        className="block py-2 px-4 text-sm hover:bg-gray-50 rounded"
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Link
              to="/wishlist"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>
            
            <Link
              to="/cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cart.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.totalItems}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="relative group">
                <Link
                  to={isAdmin ? "/admin" : "/profile"}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                  aria-label="User Account"
                >
                  <User className="w-5 h-5" />
                </Link>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user?.name}
                  </div>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Sign In"
              >
                <User className="w-5 h-5" />
              </Link>
            )}
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-16">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    to={`/category/${category.name.toLowerCase()}`}
                    className="text-lg font-medium py-2 border-b border-gray-100 block"
                    onClick={() => setIsOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 mt-2 space-y-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory}
                        to={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                        className="text-sm py-1 block text-gray-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {subcategory}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              
              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="text-lg font-medium py-2 border-b border-gray-100"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <Link
                    to="/profile"
                    className="text-lg font-medium py-2 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/orders"
                    className="text-lg font-medium py-2 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-lg font-medium py-2 border-b border-gray-100 text-left w-full"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-lg font-medium py-2 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="text-lg font-medium py-2 border-b border-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
      
      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white w-full max-w-2xl rounded-lg overflow-hidden mx-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full p-4 pr-12 focus:outline-none text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <Search className="w-6 h-6 text-gray-500" />
              </button>
            </form>
            <div className="p-4 border-t">
              <h3 className="font-medium mb-2">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSearchQuery('dresses')}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                >
                  Dresses
                </button>
                <button 
                  onClick={() => setSearchQuery('summer')}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                >
                  Summer
                </button>
                <button 
                  onClick={() => setSearchQuery('shoes')}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                >
                  Shoes
                </button>
                <button 
                  onClick={() => setSearchQuery('accessories')}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                >
                  Accessories
                </button>
              </div>
            </div>
            <button
              onClick={toggleSearch}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;