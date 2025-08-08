import React, { Suspense } from 'react';
import MenuItemPage from './MenuItemPage';
import { getMenuItem, getMenuItems } from '@/lib/microcms';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { slug: string };
}

export default async function MenuItemPageWrapper({ params }: PageProps) {
  let item = null;
  let relatedItems = [];

  try {
    // Fetch the menu item by slug
    item = await getMenuItem(params.slug);
    
    // Fetch related items from the same category
    const relatedResponse = await getMenuItems({
      category: item.category.id,
      limit: 3
    });
    
    // Filter out the current item from related items
    relatedItems = relatedResponse.contents.filter(relatedItem => relatedItem.id !== item.id);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    notFound();
  }

  if (!item) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuItemPage item={item} relatedItems={relatedItems} />
    </Suspense>
  );
}
