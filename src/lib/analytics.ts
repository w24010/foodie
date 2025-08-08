import { track } from '@vercel/analytics';

// Analytics utility functions for the food delivery app
export const analytics = {
  // Menu and Product Events
  trackMenuItemView: (item: {
    id: string;
    name: string;
    category: string;
    price: number;
    featured?: boolean;
  }) => {
    track('Menu Item Viewed', {
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      price: item.price,
      featured: item.featured || false,
      timestamp: new Date().toISOString(),
    });
  },

  trackMenuSearch: (query: string, resultsCount: number) => {
    track('Menu Search', {
      searchQuery: query,
      resultsCount,
      timestamp: new Date().toISOString(),
    });
  },

  trackCategoryFilter: (category: string, itemCount: number) => {
    track('Category Filtered', {
      category,
      itemCount,
      timestamp: new Date().toISOString(),
    });
  },

  // Cart Events
  trackAddToCart: (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category?: string;
  }) => {
    track('Item Added to Cart', {
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      value: item.price * item.quantity,
      timestamp: new Date().toISOString(),
    });
  },

  trackRemoveFromCart: (item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }) => {
    track('Item Removed from Cart', {
      itemId: item.id,
      itemName: item.name,
      price: item.price,
      quantity: item.quantity,
      value: item.price * item.quantity,
      timestamp: new Date().toISOString(),
    });
  },

  trackUpdateCartQuantity: (item: {
    id: string;
    name: string;
    oldQuantity: number;
    newQuantity: number;
    price: number;
  }) => {
    track('Cart Quantity Updated', {
      itemId: item.id,
      itemName: item.name,
      oldQuantity: item.oldQuantity,
      newQuantity: item.newQuantity,
      quantityChange: item.newQuantity - item.oldQuantity,
      price: item.price,
      timestamp: new Date().toISOString(),
    });
  },

  trackCartView: (cartData: {
    itemCount: number;
    total: number;
    items: Array<{ id: string; name: string; quantity: number; price: number }>;
  }) => {
    track('Cart Viewed', {
      itemCount: cartData.itemCount,
      cartTotal: cartData.total,
      uniqueItems: cartData.items.length,
      averageItemValue: cartData.total / cartData.itemCount,
      timestamp: new Date().toISOString(),
    });
  },

  trackCartClear: (cartData: {
    itemCount: number;
    total: number;
  }) => {
    track('Cart Cleared', {
      itemCount: cartData.itemCount,
      cartTotal: cartData.total,
      timestamp: new Date().toISOString(),
    });
  },

  // Checkout and Order Events
  trackCheckoutStarted: (checkoutData: {
    itemCount: number;
    total: number;
    deliveryType: string;
  }) => {
    track('Checkout Started', {
      itemCount: checkoutData.itemCount,
      orderTotal: checkoutData.total,
      deliveryType: checkoutData.deliveryType,
      timestamp: new Date().toISOString(),
    });
  },

  trackCheckoutStep: (step: string, data?: Record<string, any>) => {
    track('Checkout Step Completed', {
      step,
      ...data,
      timestamp: new Date().toISOString(),
    });
  },

  trackPaymentMethodSelected: (method: string) => {
    track('Payment Method Selected', {
      paymentMethod: method,
      timestamp: new Date().toISOString(),
    });
  },

  trackOrderPlaced: (orderData: {
    orderId?: string;
    total: number;
    itemCount: number;
    deliveryType: string;
    paymentMethod: string;
    deliveryFee: number;
    tax: number;
  }) => {
    track('Order Placed', {
      orderId: orderData.orderId,
      orderTotal: orderData.total,
      itemCount: orderData.itemCount,
      deliveryType: orderData.deliveryType,
      paymentMethod: orderData.paymentMethod,
      deliveryFee: orderData.deliveryFee,
      tax: orderData.tax,
      subtotal: orderData.total - orderData.deliveryFee - orderData.tax,
      timestamp: new Date().toISOString(),
    });
  },

  trackOrderError: (error: string, step: string) => {
    track('Order Error', {
      errorMessage: error,
      step,
      timestamp: new Date().toISOString(),
    });
  },

  // User Authentication Events
  trackSignupStarted: () => {
    track('Signup Started', {
      timestamp: new Date().toISOString(),
    });
  },

  trackSignupCompleted: (method: string) => {
    track('Signup Completed', {
      signupMethod: method,
      timestamp: new Date().toISOString(),
    });
  },

  trackLoginAttempt: (method: string) => {
    track('Login Attempted', {
      loginMethod: method,
      timestamp: new Date().toISOString(),
    });
  },

  trackLoginSuccess: (method: string) => {
    track('Login Successful', {
      loginMethod: method,
      timestamp: new Date().toISOString(),
    });
  },

  // User Engagement Events
  trackFavoriteAdded: (item: {
    id: string;
    name: string;
    category: string;
  }) => {
    track('Item Added to Favorites', {
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      timestamp: new Date().toISOString(),
    });
  },

  trackFavoriteRemoved: (item: {
    id: string;
    name: string;
    category: string;
  }) => {
    track('Item Removed from Favorites', {
      itemId: item.id,
      itemName: item.name,
      category: item.category,
      timestamp: new Date().toISOString(),
    });
  },

  trackPromoCodeApplied: (promoCode: string, discount: number) => {
    track('Promo Code Applied', {
      promoCode,
      discountAmount: discount,
      timestamp: new Date().toISOString(),
    });
  },

  trackPromoCodeError: (promoCode: string, error: string) => {
    track('Promo Code Error', {
      promoCode,
      errorMessage: error,
      timestamp: new Date().toISOString(),
    });
  },

  // Page Navigation Events
  trackPageView: (page: string, additionalData?: Record<string, any>) => {
    track('Page View', {
      page,
      ...additionalData,
      timestamp: new Date().toISOString(),
    });
  },

  trackExternalLinkClick: (linkUrl: string, linkText: string) => {
    track('External Link Clicked', {
      linkUrl,
      linkText,
      timestamp: new Date().toISOString(),
    });
  },

  // Performance and Error Events
  trackPerformanceMetric: (metric: string, value: number, unit: string) => {
    track('Performance Metric', {
      metric,
      value,
      unit,
      timestamp: new Date().toISOString(),
    });
  },

  trackUserError: (error: string, context: string) => {
    track('User Error', {
      errorMessage: error,
      context,
      timestamp: new Date().toISOString(),
    });
  },

  // Custom Business Events
  trackReorder: (originalOrderId: string, newOrderTotal: number) => {
    track('Order Reordered', {
      originalOrderId,
      newOrderTotal,
      timestamp: new Date().toISOString(),
    });
  },

  trackDeliveryTimeSelected: (timeSlot: string) => {
    track('Delivery Time Selected', {
      timeSlot,
      timestamp: new Date().toISOString(),
    });
  },

  trackContactlessDelivery: (enabled: boolean) => {
    track('Contactless Delivery', {
      enabled,
      timestamp: new Date().toISOString(),
    });
  },
};