'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MenuItem } from '@/lib/microcms';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { PlusIcon, StarIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

interface MenuCardProps {
  item: MenuItem;
  variant?: 'default' | 'featured' | 'compact';
}

const MenuCard: React.FC<MenuCardProps> = ({ item, variant = 'default' }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image.url,
      slug: item.slug,
    });
  };

  if (variant === 'compact') {
    return (
      <Link href={`/menu/${item.slug}`} className="block">
        <div className="food-card p-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image.url}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-bold text-red-600">
                  {formatPrice(item.price)}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link href={`/menu/${item.slug}`} className="block">
        <div className="food-card relative overflow-hidden">
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ Featured
          </div>
          
          {/* Wishlist Button */}
          <button className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-red-500 p-2 rounded-full transition-all">
            <HeartIcon className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={item.image.url}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-2">
              <span className="badge badge-category">{item.category.name}</span>
              <div className="flex items-center space-x-1">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-600">4.8</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-red-600">
                {formatPrice(item.price)}
              </span>
              <button
                onClick={handleAddToCart}
                className="btn-primary flex items-center space-x-2"
              >
                <PlusIcon className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link href={`/menu/${item.slug}`} className="block">
      <div className="food-card group">
        {/* Wishlist Button */}
        <div className="relative">
          <button className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-red-500 p-2 rounded-full transition-all opacity-0 group-hover:opacity-100">
            <HeartIcon className="w-5 h-5" />
          </button>

          {/* Image */}
          <div className="relative h-48 overflow-hidden rounded-t-xl">
            <Image
              src={item.image.url}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {item.featured && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                ⭐ Featured
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="badge badge-category">{item.category.name}</span>
            <div className="flex items-center space-x-1">
              <StarIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-600">4.8</span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-red-600">
              {formatPrice(item.price)}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all transform hover:scale-105"
            >
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MenuCard;