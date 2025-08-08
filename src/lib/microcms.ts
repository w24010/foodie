import { createClient } from 'microcms-js-sdk';

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error('MICROCMS_SERVICE_DOMAIN is required');
}

if (!process.env.MICROCMS_API_KEY) {
  throw new Error('MICROCMS_API_KEY is required');
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    height: number;
    width: number;
  };
  category: {
    id: string;
    name: string;
    slug?: string;
  };
  slug: string;
  featured: boolean;
  available: boolean;
  // Optional nutrition and detail fields
  ingredients?: string[];
  allergens?: string[];
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  spice_level?: string;
  prep_time?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
}

export interface MenuResponse {
  contents: MenuItem[];
  totalCount: number;
  offset: number;
  limit: number;
}

export interface CategoryResponse {
  contents: Category[];
  totalCount: number;
  offset: number;
  limit: number;
}

export const getMenuItems = async (options?: {
  limit?: number;
  offset?: number;
  category?: string;
  featured?: boolean;
}): Promise<MenuResponse> => {
  try {
    const filters = [];
    
    if (options?.category && options.category !== 'all') {
      // Try both category ID and slug for flexible filtering
      filters.push(`category[equals]${options.category}`);
    }
    
    if (options?.featured) {
      filters.push('featured[equals]true');
    }
    
    filters.push('available[equals]true');

    const response = await client.get({
      endpoint: 'menu-items',
      queries: {
        limit: options?.limit || 10,
        offset: options?.offset || 0,
        filters: filters.length > 0 ? filters.join('[and]') : undefined,
      },
    });

    return response;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    // Return empty response if MicroCMS is not configured
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 10
    };
  }
};

export const getMenuItem = async (slug: string): Promise<MenuItem> => {
  try {
    const response = await client.get({
      endpoint: 'menu-items',
      queries: {
        filters: `slug[equals]${slug}`,
      },
    });

    if (response.contents.length === 0) {
      throw new Error('Menu item not found');
    }

    return response.contents[0];
  } catch (error) {
    console.error('Error fetching menu item:', error);
    throw error;
  }
};

export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const response = await client.get({
      endpoint: 'categories',
    });

    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return empty response if MicroCMS is not configured
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 10
    };
  }
};