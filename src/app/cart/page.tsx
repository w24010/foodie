'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import { formatPrice } from '@/lib/utils';
import { 
  ShoppingBagIcon, 
  ArrowRightIcon,
  TagIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

export default function CartPage() {
  const { items, total, itemCount, clearCart } = useCart();

  const deliveryFee = total >= 25 ? 0 : 3.99;
  const tax = total * 0.08875; // 8.875% tax
  const finalTotal = total + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-gray-400 text-8xl mb-6">
            <ShoppingBagIcon className="w-32 h-32 mx-auto" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any delicious items to your cart yet. 
            Browse our menu and discover amazing dishes!
          </p>
          <Link href="/menu" className="btn-primary text-lg px-8 py-4">
            Start Shopping
            <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
                <button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TagIcon className="w-5 h-5 mr-2 text-red-500" />
                Promo Code
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <button className="btn-secondary px-6 py-3">
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center">
                    <TruckIcon className="w-4 h-4 mr-1" />
                    Delivery Fee
                    {total >= 25 && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        FREE
                      </span>
                    )}
                  </span>
                  <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'FREE'}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                
                {total < 25 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800">
                      Add {formatPrice(25 - total)} more to get free delivery!
                    </p>
                  </div>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>{formatPrice(finalTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full btn-primary text-lg py-4 mb-4 block text-center"
              >
                Proceed to Checkout
                <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
              </Link>
              
              <Link
                href="/menu"
                className="w-full text-center text-red-500 hover:text-red-600 font-medium py-3 border border-red-500 rounded-lg hover:bg-red-50 transition-all block"
              >
                Continue Shopping
              </Link>

              {/* Delivery Info */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">Delivery Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span>Estimated delivery: 25-35 minutes</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    <span>Free delivery on orders $25+</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span>Hot & fresh guaranteed</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">We Accept</h3>
                <div className="flex space-x-2">
                  <div className="bg-gray-100 rounded px-3 py-2 text-xs font-medium">💳 Cards</div>
                  <div className="bg-gray-100 rounded px-3 py-2 text-xs font-medium">📱 Apple Pay</div>
                  <div className="bg-gray-100 rounded px-3 py-2 text-xs font-medium">🟢 PayPal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recently Viewed or Recommendations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Bought Together</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* These would be dynamic recommendations in a real app */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <h4 className="font-semibold">Garlic Bread</h4>
                  <p className="text-gray-600 text-sm">Perfect side dish</p>
                  <span className="text-red-600 font-bold">$4.99</span>
                </div>
                <button className="btn-primary text-sm px-4 py-2">Add</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <h4 className="font-semibold">Soft Drinks</h4>
                  <p className="text-gray-600 text-sm">Coca-Cola, Pepsi, Sprite</p>
                  <span className="text-red-600 font-bold">$2.99</span>
                </div>
                <button className="btn-primary text-sm px-4 py-2">Add</button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                <div className="flex-1">
                  <h4 className="font-semibold">Chocolate Brownie</h4>
                  <p className="text-gray-600 text-sm">Sweet finish to your meal</p>
                  <span className="text-red-600 font-bold">$6.99</span>
                </div>
                <button className="btn-primary text-sm px-4 py-2">Add</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}