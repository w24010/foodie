'use client';

import React, { useState, useMemo } from 'react';
import MenuCard from '@/components/MenuCard';
import { MenuItem, Category } from '@/lib/microcms';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface MenuPageProps {
  initialMenuItems: MenuItem[];
  categories: Category[];
  searchParams: { category?: string; search?: string; sort?: string };
}

const sortOptions = [
  { value: 'name', label: 'Name (A-Z)' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'featured', label: 'Featured First' }
];

export default function MenuPage({ initialMenuItems, categories, searchParams }: MenuPageProps) {
  const [searchQuery, setSearchQuery] = useState(searchParams.search || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.category || 'all');
  const [sortBy, setSortBy] = useState(searchParams.sort || 'name');
  const [showFilters, setShowFilters] = useState(false);

  // Prepare categories with "All Items" option
  const categoriesWithAll = [
    { id: 'all', name: 'All Items', slug: 'all' },
    ...categories
  ];

  const filteredAndSortedItems = useMemo(() => {
    let filtered = initialMenuItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
                             item.category.id === selectedCategory ||
                             item.category.slug === selectedCategory;
      
      return matchesSearch && matchesCategory && item.available;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'featured':
          return b.featured ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [initialMenuItems, searchQuery, selectedCategory, sortBy]);

  const featuredItems = initialMenuItems.filter(item => item.featured && item.available);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our delicious selection of carefully crafted dishes made with fresh, 
              high-quality ingredients.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center justify-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <FunnelIcon className="w-5 h-5 mr-2" />
                Filters
              </button>
            </div>

            {/* Desktop Filters */}
            <div className={`${showFilters ? 'block' : 'hidden md:block'} grid grid-cols-1 md:grid-cols-2 gap-4`}>
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categoriesWithAll.map((category) => (
                    <option key={category.id} value={category.slug || category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems.map((item) => (
                <MenuCard key={item.id} item={item} variant="featured" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Menu Items */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              All Items 
              <span className="text-lg font-normal text-gray-600 ml-2">
                ({filteredAndSortedItems.length} items)
              </span>
            </h2>
          </div>

          {filteredAndSortedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAndSortedItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-red-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our menu is constantly evolving. Contact us if you have special dietary requirements 
            or would like to suggest a new dish.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              Contact Us
            </button>
            <button className="text-red-500 border border-red-500 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg transition-all">
              View Specials
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}