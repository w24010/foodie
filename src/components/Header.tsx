'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { itemCount, total } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-red-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🍕</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">FoodieExpress</h1>
              <p className="text-sm text-gray-500">Delicious food, delivered fast</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              Home
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              Menu
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-red-500 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-64">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search for food..."
              className="bg-transparent outline-none flex-1 text-gray-700"
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-red-500 transition-colors">
              <ShoppingCartIcon className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <Link href="/dashboard" className="p-2 text-gray-700 hover:text-red-500 transition-colors">
              <UserIcon className="w-6 h-6" />
            </Link>

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-2">
              <Link href="/login" className="text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-lg border border-red-500 hover:bg-red-50 transition-all">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Sign Up
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-red-500 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-red-500 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/menu" 
                className="text-gray-700 hover:text-red-500 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-red-500 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-red-500 font-medium transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Mobile Search */}
              <div className="px-4 py-2">
                <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search for food..."
                    className="bg-transparent outline-none flex-1 text-gray-700"
                  />
                </div>
              </div>

              {/* Mobile Auth Buttons */}
              <div className="px-4 py-2 space-y-2">
                <Link 
                  href="/login" 
                  className="block text-center text-red-500 hover:text-red-600 font-medium px-4 py-2 rounded-lg border border-red-500 hover:bg-red-50 transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/signup" 
                  className="block text-center btn-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>

              {/* Cart Info */}
              {itemCount > 0 && (
                <div className="px-4 py-2 bg-red-50 rounded-lg mx-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Cart Total:</span>
                    <span className="font-bold text-red-600">${total.toFixed(2)}</span>
                  </div>
                  <Link 
                    href="/cart" 
                    className="block mt-2 text-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    View Cart ({itemCount} items)
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;