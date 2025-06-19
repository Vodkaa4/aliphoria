import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { useWishlist } from '../../context/WishlistContext';

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg mb-3">
          {/* Product image */}
          <div className="aspect-w-3 aspect-h-4 bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white px-4 py-2 text-sm font-medium">
              Quick View
            </span>
          </div>
          
          {/* Badge for sale or featured */}
          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1">
              SALE
            </div>
          )}
          
          {product.featured && !product.discount && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs font-bold px-2 py-1">
              FEATURED
            </div>
          )}
          
          {/* Wishlist button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md transition-colors hover:bg-gray-100"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={16}
              className={isWishlisted ? "fill-black text-black" : "text-gray-600"}
            />
          </button>
        </div>
        
        {/* Product info */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">
            {product.name}
          </h3>
          <p className="text-sm mb-1 text-gray-500">
            {product.category} • {product.subcategory}
          </p>
          <div className="flex items-center">
            {product.discount ? (
              <>
                <span className="text-sm font-medium text-red-600">
                  ${product.discount.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-sm font-medium">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;