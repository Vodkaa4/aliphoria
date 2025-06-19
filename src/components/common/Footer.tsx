import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-bold mb-6">ALIPHORIA</h3>
            <p className="text-gray-600 mb-4">
              Elevate your style with our curated collections of contemporary fashion.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/category/women"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  to="/category/men"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  to="/category/accessories"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/category/shoes"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/new-arrivals"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/sale"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  to="/faqs"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="text-gray-600 hover:text-black transition-colors"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Stay Updated
            </h3>
            <p className="text-gray-600 mb-4">
              Subscribe to our newsletter for exclusive offers and style updates.
            </p>
            <form className="flex flex-col space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 flex items-center justify-center"
                  aria-label="Subscribe"
                >
                  <Mail size={18} />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-8 mt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Aliphoria. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy-policy"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookie-policy"
                className="text-sm text-gray-500 hover:text-black transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;