import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Women',
    image: 'https://images.pexels.com/photos/5885845/pexels-photo-5885845.jpeg',
    subcategories: ['Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Activewear']
  },
  {
    id: '2',
    name: 'Men',
    image: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg',
    subcategories: ['Shirts', 'T-shirts', 'Pants', 'Outerwear', 'Activewear']
  },
  {
    id: '3',
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/1078958/pexels-photo-1078958.jpeg',
    subcategories: ['Bags', 'Jewelry', 'Hats', 'Sunglasses', 'Watches']
  },
  {
    id: '4',
    name: 'Shoes',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
    subcategories: ['Sneakers', 'Heels', 'Boots', 'Sandals', 'Loafers']
  }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Summer Breeze Maxi Dress',
    description: 'Light and airy maxi dress perfect for summer days and nights. Features a flowing silhouette and delicate floral pattern.',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/7691168/pexels-photo-7691168.jpeg',
      'https://images.pexels.com/photos/7691216/pexels-photo-7691216.jpeg'
    ],
    category: 'Women',
    subcategory: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sage', hex: '#B2BEB5' },
      { name: 'Blush', hex: '#DE5D83' }
    ],
    tags: ['summer', 'casual', 'floral'],
    featured: true,
    trending: true,
    inStock: true,
    createdAt: '2023-05-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Classic Tailored Blazer',
    description: 'A timeless tailored blazer that effortlessly elevates any outfit. Features structured shoulders and a slim fit.',
    price: 129.99,
    images: [
      'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg',
      'https://images.pexels.com/photos/5384422/pexels-photo-5384422.jpeg'
    ],
    category: 'Women',
    subcategory: 'Outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' }
    ],
    tags: ['formal', 'office', 'classic'],
    featured: true,
    inStock: true,
    createdAt: '2023-05-10T14:20:00Z'
  },
  {
    id: '3',
    name: 'Slim Fit Cotton Shirt',
    description: 'Premium cotton slim fit shirt with modern details. Perfect for both casual and formal occasions.',
    price: 59.99,
    images: [
      'https://images.pexels.com/photos/297933/pexels-photo-297933.jpeg',
      'https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg'
    ],
    category: 'Men',
    subcategory: 'Shirts',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Pink', hex: '#FFC0CB' }
    ],
    tags: ['formal', 'casual', 'cotton'],
    inStock: true,
    createdAt: '2023-05-05T09:15:00Z'
  },
  {
    id: '4',
    name: 'High-Rise Straight Jeans',
    description: 'Vintage-inspired high-rise straight leg jeans with a flattering fit and premium denim construction.',
    price: 79.99,
    images: [
      'https://images.pexels.com/photos/6774665/pexels-photo-6774665.jpeg',
      'https://images.pexels.com/photos/6774914/pexels-photo-6774914.jpeg'
    ],
    category: 'Women',
    subcategory: 'Bottoms',
    sizes: ['24', '25', '26', '27', '28', '29', '30', '31', '32'],
    colors: [
      { name: 'Mid Blue', hex: '#7393B3' },
      { name: 'Washed Black', hex: '#2F4F4F' }
    ],
    tags: ['denim', 'casual', 'everyday'],
    trending: true,
    inStock: true,
    createdAt: '2023-05-20T16:45:00Z'
  },
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    description: 'Compact leather crossbody bag with adjustable strap and multiple compartments. Perfect for everyday essentials.',
    price: 119.99,
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
      'https://images.pexels.com/photos/1936848/pexels-photo-1936848.jpeg'
    ],
    category: 'Accessories',
    subcategory: 'Bags',
    sizes: ['One Size'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Tan', hex: '#D2B48C' },
      { name: 'Burgundy', hex: '#800020' }
    ],
    tags: ['leather', 'everyday', 'essentials'],
    featured: true,
    inStock: true,
    createdAt: '2023-05-18T11:30:00Z'
  },
  {
    id: '6',
    name: 'Minimalist Sneakers',
    description: 'Clean, minimalist sneakers crafted from premium materials with exceptional comfort and durability.',
    price: 99.99,
    images: [
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg',
      'https://images.pexels.com/photos/1240892/pexels-photo-1240892.jpeg'
    ],
    category: 'Shoes',
    subcategory: 'Sneakers',
    sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#000000' }
    ],
    tags: ['casual', 'comfortable', 'everyday'],
    trending: true,
    inStock: true,
    createdAt: '2023-06-01T10:00:00Z'
  },
  {
    id: '7',
    name: 'Oversized Knit Sweater',
    description: 'Cozy oversized knit sweater with dropped shoulders and ribbed details. Perfect for layering in colder weather.',
    price: 69.99,
    discount: 59.99,
    images: [
      'https://images.pexels.com/photos/6347546/pexels-photo-6347546.jpeg',
      'https://images.pexels.com/photos/6347535/pexels-photo-6347535.jpeg'
    ],
    category: 'Women',
    subcategory: 'Tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Grey Melange', hex: '#B4B8B9' },
      { name: 'Olive', hex: '#808000' }
    ],
    tags: ['knitwear', 'winter', 'cozy'],
    trending: true,
    inStock: true,
    createdAt: '2023-05-25T13:20:00Z'
  },
  {
    id: '8',
    name: 'Athletic Performance Leggings',
    description: 'High-performance leggings with four-way stretch, moisture-wicking technology, and hidden pocket details.',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/3094215/pexels-photo-3094215.jpeg',
      'https://images.pexels.com/photos/3094230/pexels-photo-3094230.jpeg'
    ],
    category: 'Women',
    subcategory: 'Activewear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#000080' },
      { name: 'Plum', hex: '#8E4585' }
    ],
    tags: ['workout', 'athletic', 'performance'],
    inStock: true,
    createdAt: '2023-05-30T09:45:00Z'
  }
];