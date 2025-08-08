'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import { MenuItem } from '@/lib/microcms';
import MenuCard from '@/components/MenuCard';
import { 
  StarIcon, 
  MinusIcon, 
  PlusIcon,
  HeartIcon,
  ShareIcon,
  ArrowLeftIcon,
  ClockIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

interface MenuItemPageProps {
  item: MenuItem;
  relatedItems: MenuItem[];
}

export default function MenuItemPage({ item, relatedItems }: MenuItemPageProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image.url,
        slug: item.slug,
      });
    }
    setQuantity(1);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const totalPrice = item.price * quantity;

  // Helper function to safely get nutrition info
  const getNutritionValue = (field: string, defaultValue: number = 0) => {
    return (item as any)[field] || defaultValue;
  };

  // Helper function to get ingredients array
  const getIngredients = () => {
    if (Array.isArray((item as any).ingredients)) {
      return (item as any).ingredients;
    }
    if (typeof (item as any).ingredients === 'string') {
      return [(item as any).ingredients];
    }
    return ['Fresh ingredients'];
  };

  // Helper function to get allergens array
  const getAllergens = () => {
    if (Array.isArray((item as any).allergens)) {
      return (item as any).allergens;
    }
    if (typeof (item as any).allergens === 'string') {
      return [(item as any).allergens];
    }
    return [];
  };

  const ingredients = getIngredients();
  const allergens = getAllergens();
  const calories = getNutritionValue('calories', 250);
  const protein = getNutritionValue('protein', 10);
  const carbs = getNutritionValue('carbs', 30);
  const prepTime = (item as any).prep_time || '15-20 minutes';
  const spiceLevel = (item as any).spice_level || 'Mild';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <Link href="/menu" className="flex items-center text-red-500 hover:text-red-600 transition-colors">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Menu
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={item.image.url}
                alt={item.name}
                fill
                className="object-cover"
                priority
              />
              {item.featured && (
                <div className="absolute top-6 left-6 bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
                  ⭐ Featured
                </div>
              )}
              <button
                onClick={toggleWishlist}
                className="absolute top-6 right-6 bg-white/90 hover:bg-white p-3 rounded-full transition-all"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>

            {/* Thumbnail Gallery (if multiple images available) */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-red-500 transition-colors"
                  onClick={() => setActiveImageIndex(index - 1)}
                >
                  <Image
                    src={item.image.url}
                    alt={`${item.name} view ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="badge badge-category">{item.category.name}</span>
                <div className="flex items-center space-x-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.8 (124 reviews)</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
            </div>

            {/* Price and Quick Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-red-600">{formatPrice(item.price)}</div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{prepTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FireIcon className="w-4 h-4" />
                    <span>{spiceLevel}</span>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-3 font-medium min-w-[4rem] text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="p-3 hover:bg-gray-100 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full btn-primary text-lg py-4"
                  disabled={!item.available}
                >
                  {item.available ? (
                    <>Add to Cart - {formatPrice(totalPrice)}</>
                  ) : (
                    'Currently Unavailable'
                  )}
                </button>
                <button className="w-full flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <ShareIcon className="w-5 h-5" />
                  <span>Share this item</span>
                </button>
              </div>
            </div>

            {/* Nutrition Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-red-600">{calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">{carbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h3 className="text-lg font-semibold mb-4">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
              {allergens.length > 0 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm">
                    <span className="font-medium text-yellow-800">Allergens: </span>
                    <span className="text-yellow-700">{allergens.join(', ')}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.slice(0, 3).map((relatedItem) => (
                <MenuCard key={relatedItem.id} item={relatedItem} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}