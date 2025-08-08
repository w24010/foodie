import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  fetchRestaurants,
  fetchFeaturedRestaurants,
  fetchMenuItems,
  fetchPopularMenuItems,
  fetchCategories,
  searchRestaurants,
  searchMenuItems,
  microCMSQueryConfig,
  Restaurant,
  MenuItem,
  Category,
} from '@/lib/microcms';

// Hook for fetching all restaurants
export const useRestaurants = (limit = 10, offset = 0): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['restaurants', limit, offset],
    queryFn: () => fetchRestaurants(limit, offset),
    ...microCMSQueryConfig,
  });
};

// Hook for fetching featured restaurants
export const useFeaturedRestaurants = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['restaurants', 'featured'],
    queryFn: fetchFeaturedRestaurants,
    ...microCMSQueryConfig,
  });
};

// Hook for fetching menu items
export const useMenuItems = (restaurantId?: string, category?: string): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['menu-items', restaurantId, category],
    queryFn: () => fetchMenuItems(restaurantId, category),
    ...microCMSQueryConfig,
  });
};

// Hook for fetching popular menu items
export const usePopularMenuItems = (limit = 6): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['menu-items', 'popular', limit],
    queryFn: () => fetchPopularMenuItems(limit),
    ...microCMSQueryConfig,
  });
};

// Hook for fetching categories
export const useCategories = (): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    ...microCMSQueryConfig,
  });
};

// Hook for searching restaurants
export const useSearchRestaurants = (query: string, category?: string, enabled = true): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['search', 'restaurants', query, category],
    queryFn: () => searchRestaurants(query, category),
    enabled: enabled && query.length > 0,
    ...microCMSQueryConfig,
  });
};

// Hook for searching menu items
export const useSearchMenuItems = (query: string, category?: string, enabled = true): UseQueryResult<any, Error> => {
  return useQuery({
    queryKey: ['search', 'menu-items', query, category],
    queryFn: () => searchMenuItems(query, category),
    enabled: enabled && query.length > 0,
    ...microCMSQueryConfig,
  });
};

// Custom hook for real-time search with debouncing
import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Combined search hook with debouncing
export const useSearch = (query: string, category?: string) => {
  const debouncedQuery = useDebounce(query, 300);
  
  const restaurantSearch = useSearchRestaurants(debouncedQuery, category, debouncedQuery.length > 0);
  const menuItemSearch = useSearchMenuItems(debouncedQuery, category, debouncedQuery.length > 0);

  return {
    restaurants: restaurantSearch,
    menuItems: menuItemSearch,
    isSearching: restaurantSearch.isLoading || menuItemSearch.isLoading,
    hasQuery: debouncedQuery.length > 0,
  };
};