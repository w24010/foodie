'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';
import { 
  UserIcon,
  CogIcon,
  HeartIcon,
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
  BellIcon,
  ArrowRightIcon,
  StarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

// Mock user data
const mockUser = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
  joinDate: new Date('2024-01-15'),
  totalOrders: 24,
  totalSpent: 486.75,
  loyaltyPoints: 1250
};

// Mock order data
const mockOrders = [
  {
    id: 'ORD-2024-001',
    date: new Date('2024-08-07T19:30:00'),
    status: 'delivered',
    total: 28.99,
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 16.99 },
      { name: 'Caesar Salad', quantity: 1, price: 11.99 }
    ],
    restaurant: 'Pizza Palace',
    deliveryAddress: '123 Main St, Apartment 4B'
  },
  {
    id: 'ORD-2024-002',
    date: new Date('2024-08-05T18:15:00'),
    status: 'delivered',
    total: 24.50,
    items: [
      { name: 'Beef Burger', quantity: 2, price: 14.99 },
      { name: 'Fries', quantity: 1, price: 4.99 }
    ],
    restaurant: 'Burger House',
    deliveryAddress: '123 Main St, Apartment 4B'
  },
  {
    id: 'ORD-2024-003',
    date: new Date('2024-08-03T20:45:00'),
    status: 'cancelled',
    total: 32.75,
    items: [
      { name: 'Chicken Pad Thai', quantity: 1, price: 13.99 },
      { name: 'Spring Rolls', quantity: 1, price: 8.99 }
    ],
    restaurant: 'Thai Garden',
    deliveryAddress: '123 Main St, Apartment 4B'
  }
];

// Mock favorite items
const mockFavorites = [
  {
    id: '1',
    name: 'Margherita Pizza',
    restaurant: 'Pizza Palace',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    lastOrdered: new Date('2024-08-07')
  },
  {
    id: '2',
    name: 'Beef Burger',
    restaurant: 'Burger House',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    lastOrdered: new Date('2024-08-05')
  }
];

const mockAddresses = [
  {
    id: '1',
    label: 'Home',
    address: '123 Main Street, Apartment 4B',
    city: 'New York, NY 10001',
    isDefault: true
  },
  {
    id: '2',
    label: 'Work',
    address: '456 Corporate Blvd, Suite 200',
    city: 'New York, NY 10002',
    isDefault: false
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusBadge = (status: string) => {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'delivered':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'preparing':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'on-the-way':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: UserIcon },
    { id: 'orders', name: 'Order History', icon: ClockIcon },
    { id: 'favorites', name: 'Favorites', icon: HeartIcon },
    { id: 'addresses', name: 'Addresses', icon: MapPinIcon },
    { id: 'payment', name: 'Payment Methods', icon: CreditCardIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={mockUser.avatar}
                  alt={`${mockUser.firstName} ${mockUser.lastName}`}
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {mockUser.firstName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Member since {formatDate(mockUser.joinDate).split(',')[0]}
              </p>
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{mockUser.totalOrders}</div>
                  <div className="text-sm text-gray-600">Total Orders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{formatPrice(mockUser.totalSpent)}</div>
                  <div className="text-sm text-gray-600">Total Spent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{mockUser.loyaltyPoints}</div>
                  <div className="text-sm text-gray-600">Loyalty Points</div>
                </div>
              </div>
            </div>
            <div>
              <button className="btn-primary">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                        <ClockIcon className="w-6 h-6 text-red-500" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Recent Orders</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <HeartIcon className="w-6 h-6 text-orange-500" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Favorites</p>
                        <p className="text-2xl font-bold text-gray-900">{mockFavorites.length}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <StarIcon className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-600">Loyalty Points</p>
                        <p className="text-2xl font-bold text-gray-900">{mockUser.loyaltyPoints}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className="text-red-500 hover:text-red-600 font-medium flex items-center"
                    >
                      View All
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {mockOrders.slice(0, 2).map((order) => (
                      <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium text-gray-900">{order.id}</span>
                            <span className={getStatusBadge(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900">{formatPrice(order.total)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{order.restaurant}</p>
                        <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Favorite Items */}
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Your Favorites</h2>
                    <button 
                      onClick={() => setActiveTab('favorites')}
                      className="text-red-500 hover:text-red-600 font-medium flex items-center"
                    >
                      View All
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockFavorites.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">{item.restaurant}</p>
                            <p className="text-lg font-bold text-red-600">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                <div className="space-y-6">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h3 className="font-semibold text-gray-900">{order.id}</h3>
                            <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                          </div>
                          <span className={getStatusBadge(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{formatPrice(order.total)}</p>
                          <button className="text-red-500 hover:text-red-600 text-sm font-medium flex items-center mt-1">
                            <EyeIcon className="w-4 h-4 mr-1" />
                            View Details
                          </button>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Restaurant:</strong> {order.restaurant}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Delivered to:</strong> {order.deliveryAddress}
                        </p>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium text-gray-700">Items:</p>
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm text-gray-600">
                              <span>{item.quantity}x {item.name}</span>
                              <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex space-x-3 mt-4">
                          <button className="btn-primary text-sm px-4 py-2">
                            Reorder
                          </button>
                          {order.status === 'delivered' && (
                            <button className="text-gray-600 border border-gray-300 hover:bg-gray-50 text-sm px-4 py-2 rounded-lg transition-colors">
                              Rate Order
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Favorite Items</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockFavorites.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">{item.restaurant}</p>
                          <p className="text-lg font-bold text-red-600">{formatPrice(item.price)}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Last ordered: {formatDate(item.lastOrdered).split(',')[0]}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="flex-1 btn-primary text-sm py-2">
                          Order Again
                        </button>
                        <button className="text-red-500 border border-red-500 hover:bg-red-50 text-sm px-4 py-2 rounded-lg transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                  <button className="btn-primary">
                    Add New Address
                  </button>
                </div>
                <div className="space-y-4">
                  {mockAddresses.map((address) => (
                    <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <MapPinIcon className="w-5 h-5 text-red-500" />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900">{address.label}</span>
                              {address.isDefault && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-gray-600">{address.address}</p>
                            <p className="text-sm text-gray-500">{address.city}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                            Edit
                          </button>
                          <button className="text-red-500 hover:text-red-600 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-600">Receive updates about your orders</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                        <p className="text-sm text-gray-600">Get text updates about deliveries</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Marketing Emails</h4>
                        <p className="text-sm text-gray-600">Receive deals and promotions</p>
                      </div>
                      <input type="checkbox" className="rounded border-gray-300 text-red-500 focus:ring-red-500" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Actions</h2>
                  <div className="space-y-4">
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-900">Change Password</h4>
                      <p className="text-sm text-gray-600">Update your account password</p>
                    </button>
                    
                    <button className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-900">Download Your Data</h4>
                      <p className="text-sm text-gray-600">Export your account information</p>
                    </button>
                    
                    <button className="w-full text-left p-4 border border-red-200 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      <h4 className="font-medium text-red-600">Delete Account</h4>
                      <p className="text-sm text-red-500">Permanently delete your account</p>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}