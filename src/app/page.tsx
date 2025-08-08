import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getMenuItems, getCategories } from '@/lib/microcms';
import { formatPrice } from '@/lib/utils';
import { 
  ClockIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default async function Home() {
  // Fetch data from MicroCMS
  let featuredDishes = [];
  let categories = [];
  let categoriesWithCount = [];

  try {
    // Fetch featured dishes
    const featuredResponse = await getMenuItems({ featured: true, limit: 3 });
    featuredDishes = featuredResponse.contents;

    // Fetch categories
    const categoriesResponse = await getCategories();
    categories = categoriesResponse.contents;

    // Get item count for each category
    categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        try {
          const itemsResponse = await getMenuItems({ category: category.id, limit: 1 });
          return {
            ...category,
            count: itemsResponse.totalCount
          };
        } catch {
          return {
            ...category,
            count: 0
          };
        }
      })
    );
  } catch (error) {
    console.error('Error fetching data from MicroCMS:', error);
    // Fallback to empty arrays - you could also use mock data here
    featuredDishes = [];
    categoriesWithCount = [];
  }
  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow">
                Delicious Food
                <span className="block text-yellow-300">Delivered Fast</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                Order from your favorite restaurants and get fresh, hot meals 
                delivered to your doorstep in under 30 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/menu" className="btn-accent text-lg px-8 py-4">
                  Order Now
                  <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
                </Link>
                <Link href="/menu" className="text-white border-2 border-white hover:bg-white hover:text-red-500 font-semibold py-4 px-8 rounded-lg transition-all">
                  View Menu
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
                  alt="Delicious food"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in under 30 minutes</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TruckIcon className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Delivery</h3>
              <p className="text-gray-600">Free delivery on orders over $25</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">Fresh ingredients and authentic flavors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-gray-600 text-lg">Discover your favorite cuisines</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categoriesWithCount.map((category) => (
              <Link
                key={category.id}
                href={`/menu?category=${category.slug}`}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-32">
                    <Image
                      src={category.image?.url || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop'}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Dishes</h2>
            <p className="text-gray-600 text-lg">Chef's special recommendations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <Link key={dish.id} href={`/menu/${dish.slug}`} className="group">
                <div className="food-card">
                  <div className="relative h-48 overflow-hidden rounded-t-xl">
                    <Image
                      src={dish.image?.url || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop'}
                      alt={dish.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      ⭐ Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="badge badge-category">{dish.category.name}</span>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{dish.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-red-600">
                        {formatPrice(dish.price)}
                      </span>
                      <button className="btn-primary">
                        Order Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/menu" className="btn-secondary text-lg px-8 py-4">
              View Full Menu
              <ArrowRightIcon className="w-5 h-5 ml-2 inline" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-xl mb-8 text-gray-100">
            Join thousands of satisfied customers and experience the best food delivery service in town.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="bg-white text-red-500 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-all text-lg">
              Sign Up Now
            </Link>
            <Link href="/menu" className="border-2 border-white text-white hover:bg-white hover:text-red-500 font-semibold py-4 px-8 rounded-lg transition-all text-lg">
              Browse Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
