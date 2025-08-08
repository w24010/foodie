'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { 
  MinusIcon, 
  PlusIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';

interface CartItemProps {
  item: CartItemType;
  variant?: 'default' | 'checkout';
}

const CartItem: React.FC<CartItemProps> = ({ item, variant = 'default' }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    removeItem(item.id);
  };

  const itemTotal = item.price * item.quantity;

  if (variant === 'checkout') {
    return (
      <div className="flex items-center justify-between py-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">{formatPrice(itemTotal)}</p>
          <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Item Image */}
        <Link href={`/menu/${item.slug}`} className="flex-shrink-0">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* Item Details */}
        <div className="flex-1 min-w-0">
          <Link href={`/menu/${item.slug}`}>
            <h3 className="font-semibold text-gray-900 hover:text-red-600 transition-colors">
              {item.name}
            </h3>
          </Link>
          <p className="text-sm text-gray-600 mt-1">{formatPrice(item.price)} each</p>
          
          {/* Quantity Controls */}
          <div className="flex items-center mt-3 space-x-3">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                disabled={item.quantity <= 1}
              >
                <MinusIcon className="w-4 h-4 text-gray-600" />
              </button>
              
              <span className="px-4 py-2 font-medium text-gray-900 min-w-[3rem] text-center">
                {item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
              >
                <PlusIcon className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Remove item"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Item Total */}
        <div className="text-right">
          <p className="text-lg font-bold text-red-600">{formatPrice(itemTotal)}</p>
          {item.quantity > 1 && (
            <p className="text-sm text-gray-500">
              {item.quantity} × {formatPrice(item.price)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;