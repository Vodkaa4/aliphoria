import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '../types';

type CartState = {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; size: string; color: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cart: CartState;
  addToCart: (product: Product, quantity: number, size: string, color: string) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
};

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const calculateTotals = (items: CartItem[]): { totalItems: number; totalAmount: number } => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (total, item) => total + (item.product.discount || item.product.price) * item.quantity,
    0
  );
  return { totalItems, totalAmount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity, size, color } = action.payload;
      
      // Check if item already exists in cart with same size and color
      const existingItemIndex = state.items.findIndex(
        item => 
          item.product.id === product.id && 
          item.size === size && 
          item.color === color
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
      } else {
        // Add new item if it doesn't exist
        updatedItems = [...state.items, { product, quantity, size, color }];
      }

      const { totalItems, totalAmount } = calculateTotals(updatedItems);
      
      return {
        items: updatedItems,
        totalItems,
        totalAmount
      };
    }

    case 'REMOVE_ITEM': {
      const { productId, size, color } = action.payload;
      const updatedItems = state.items.filter(
        item => 
          !(item.product.id === productId && 
            item.size === size && 
            item.color === color)
      );
      
      const { totalItems, totalAmount } = calculateTotals(updatedItems);
      
      return {
        items: updatedItems,
        totalItems,
        totalAmount
      };
    }

    case 'UPDATE_QUANTITY': {
      const { productId, size, color, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { 
          type: 'REMOVE_ITEM', 
          payload: { productId, size, color } 
        });
      }

      const updatedItems = state.items.map(item => 
        (item.product.id === productId && 
          item.size === size && 
          item.color === color) 
          ? { ...item, quantity } 
          : item
      );
      
      const { totalItems, totalAmount } = calculateTotals(updatedItems);
      
      return {
        items: updatedItems,
        totalItems,
        totalAmount
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType>({
  cart: initialState,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load cart from localStorage on initial render
    const savedCart = localStorage.getItem('aliphoria_cart');
    return savedCart ? JSON.parse(savedCart) : initialState;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('aliphoria_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, size: string, color: string) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity, size, color },
    });
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: { productId, size, color },
    });
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, size, color, quantity },
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;