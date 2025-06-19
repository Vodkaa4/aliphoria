import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { products, categories } from '../data/products';
import Button from '../components/common/Button';

const Home: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);
  const trendingProducts = products.filter(product => product.trending);
  
  return (
    <div>
      {/* Hero section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg"
            alt="Hero banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-lg">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Elevate Your Style
              </h1>
              <p className="text-xl text-white mb-8">
                Discover the latest trends in fashion and express yourself with our new collection.
              </p>
              <div className="flex space-x-4">
                <Link to="/category/women">
                  <Button variant="primary" size="lg">Shop Women</Button>
                </Link>
                <Link to="/category/men">
                  <Button variant="outline" size="lg" className="bg-white">Shop Men</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/category/${category.name.toLowerCase()}`}>
                <div className="group relative overflow-hidden rounded-lg aspect-w-1 aspect-h-1">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link
              to="/featured"
              className="text-sm font-medium flex items-center hover:underline"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collection banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-lg overflow-hidden">
            <img
              src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg"
              alt="Summer Collection"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center">
              <div className="max-w-lg ml-8 md:ml-16">
                <p className="text-white text-sm uppercase tracking-wider mb-2">New Season</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Summer Collection 2025
                </h2>
                <p className="text-white mb-6">
                  Discover light and breathable pieces perfect for the sunny days ahead.
                </p>
                <Link to="/new-arrivals">
                  <Button variant="primary" size="lg">Shop Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
            <Link
              to="/trending"
              className="text-sm font-medium flex items-center hover:underline"
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Subscribe to our newsletter and be the first to know about new collections, special offers, and fashion tips.
          </p>
          <div className="max-w-md mx-auto">
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 font-medium hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;