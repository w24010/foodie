import React, { Suspense } from 'react';
import MenuPage from './MenuPage';
import { getMenuItems, getCategories } from '@/lib/microcms';

interface PageProps {
  searchParams: { category?: string; search?: string; sort?: string };
}

export default async function MenuPageWrapper({ searchParams }: PageProps) {
  // Fetch data from MicroCMS
  let menuItems = [];
  let categories = [];

  try {
    // Fetch menu items with optional category filter
    const menuResponse = await getMenuItems({
      category: searchParams.category,
      limit: 50
    });
    menuItems = menuResponse.contents;

    // Fetch categories
    const categoriesResponse = await getCategories();
    categories = categoriesResponse.contents;
  } catch (error) {
    console.error('Error fetching data from MicroCMS:', error);
    menuItems = [];
    categories = [];
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuPage 
        initialMenuItems={menuItems}
        categories={categories}
        searchParams={searchParams}
      />
    </Suspense>
  );
}
