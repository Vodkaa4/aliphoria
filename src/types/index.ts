export type User = {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  sizes: string[];
  colors: {
    name: string;
    hex: string;
  }[];
  tags: string[];
  featured?: boolean;
  trending?: boolean;
  inStock: boolean;
  createdAt: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  size: string;
  color: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
};

export type Address = {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
};

export type Category = {
  id: string;
  name: string;
  image: string;
  subcategories: string[];
};