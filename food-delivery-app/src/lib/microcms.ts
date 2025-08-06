import { createClient } from 'microcms-js-sdk';

// microCMS Client Configuration
// You'll need to replace these with your actual microCMS credentials
export const client = createClient({
  serviceDomain: process.env.REACT_APP_MICROCMS_SERVICE_DOMAIN || 'your-service-domain',
  apiKey: process.env.REACT_APP_MICROCMS_API_KEY || 'your-api-key',
});

// Types for microCMS data
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  category: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: {
    url: string;
    alt?: string;
  };
  featured: boolean;
  address: string;
  phone: string;
  menu: MenuItem[];
  tags: string[];
  openingHours: {
    day: string;
    open: string;
    close: string;
  }[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  restaurant: string;
  image: {
    url: string;
    alt?: string;
  };
  popular: boolean;
  dietary: string[]; // vegetarian, vegan, gluten-free, etc.
  ingredients: string[];
  nutritionInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: {
    url: string;
    alt?: string;
  };
  color: string;
  sortOrder: number;
}

// API Functions for fetching data from microCMS
export const fetchRestaurants = async (limit = 10, offset = 0) => {
  try {
    const response = await client.get({
      endpoint: 'restaurants',
      queries: {
        limit,
        offset,
        orders: '-createdAt',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
};

export const fetchFeaturedRestaurants = async () => {
  try {
    const response = await client.get({
      endpoint: 'restaurants',
      queries: {
        filters: 'featured[equals]true',
        limit: 6,
        orders: 'rating[desc]',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching featured restaurants:', error);
    throw error;
  }
};

export const fetchMenuItems = async (restaurantId?: string, category?: string) => {
  try {
    let filters = '';
    if (restaurantId) {
      filters += `restaurant[equals]${restaurantId}`;
    }
    if (category) {
      if (filters) filters += '[and]';
      filters += `category[equals]${category}`;
    }

    const response = await client.get({
      endpoint: 'menu-items',
      queries: {
        ...(filters && { filters }),
        limit: 50,
        orders: '-popular,-createdAt',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const fetchPopularMenuItems = async (limit = 6) => {
  try {
    const response = await client.get({
      endpoint: 'menu-items',
      queries: {
        filters: 'popular[equals]true',
        limit,
        orders: 'rating[desc]',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching popular menu items:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await client.get({
      endpoint: 'categories',
      queries: {
        limit: 20,
        orders: 'sortOrder[asc]',
      },
    });
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const searchRestaurants = async (query: string, category?: string) => {
  try {
    let filters = `name[contains]${query}[or]description[contains]${query}`;
    if (category) {
      filters += `[and]category[equals]${category}`;
    }

    const response = await client.get({
      endpoint: 'restaurants',
      queries: {
        filters,
        limit: 20,
        orders: 'rating[desc]',
      },
    });
    return response;
  } catch (error) {
    console.error('Error searching restaurants:', error);
    throw error;
  }
};

export const searchMenuItems = async (query: string, category?: string) => {
  try {
    let filters = `name[contains]${query}[or]description[contains]${query}[or]ingredients[contains]${query}`;
    if (category) {
      filters += `[and]category[equals]${category}`;
    }

    const response = await client.get({
      endpoint: 'menu-items',
      queries: {
        filters,
        limit: 30,
        orders: 'rating[desc]',
      },
    });
    return response;
  } catch (error) {
    console.error('Error searching menu items:', error);
    throw error;
  }
};

// Utility function to get optimized image URL from microCMS
export const getOptimizedImageUrl = (imageUrl: string, width?: number, height?: number, quality = 80) => {
  if (!imageUrl) return '/api/placeholder/300/200';
  
  const url = new URL(imageUrl);
  if (width) url.searchParams.set('w', width.toString());
  if (height) url.searchParams.set('h', height.toString());
  url.searchParams.set('q', quality.toString());
  url.searchParams.set('fit', 'crop');
  
  return url.toString();
};

// Cache configuration for React Query
export const microCMSQueryConfig = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000, // 10 minutes
  refetchOnWindowFocus: false,
  retry: 3,
};