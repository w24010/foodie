# 📊 Analytics & Monitoring Setup Guide

## ✅ **What's Already Configured**

Your app now includes:
- **Vercel Analytics** - User behavior and page views
- **Vercel Speed Insights** - Performance monitoring
- **Sentry Integration** - Error tracking and monitoring

## 🔧 **Environment Variables Required**

Add these to your `.env.local` and Vercel dashboard:

```env
# Sentry Configuration
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn-here
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
SENTRY_AUTH_TOKEN=your-sentry-auth-token

# Vercel Analytics (automatically enabled in production)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your-analytics-id
```

## 🚀 **Quick Setup Steps**

### 1. Enable Vercel Analytics
- Go to your Vercel project dashboard
- Navigate to "Analytics" tab
- Click "Enable Analytics"
- Analytics will start collecting data automatically

### 2. Set up Sentry Error Monitoring

1. **Create Sentry Account:**
   - Go to [sentry.io](https://sentry.io)
   - Create account and new project
   - Choose "Next.js" as platform

2. **Get Sentry DSN:**
   - Copy your DSN from project settings
   - Add to environment variables

3. **Configure Sentry:**
   ```bash
   npx @sentry/wizard@latest -i nextjs
   ```

### 3. Custom Event Tracking

Track specific user actions in your app:

```typescript
// Track menu item views
import { track } from '@vercel/analytics';

track('Menu Item Viewed', {
  itemName: item.name,
  category: item.category.name,
  price: item.price
});

// Track cart actions
track('Item Added to Cart', {
  itemId: item.id,
  itemName: item.name,
  quantity: quantity
});

// Track orders
track('Order Placed', {
  total: finalTotal,
  itemCount: itemCount,
  paymentMethod: paymentMethod
});
```

## 📈 **What You Can Monitor**

### Vercel Analytics
- Page views and unique visitors
- Top pages and referrers
- User flow through your app
- Conversion funnel analysis

### Speed Insights
- Core Web Vitals (LCP, FID, CLS)
- Performance scores
- Page load times
- Real user metrics

### Sentry Error Monitoring
- JavaScript errors and exceptions
- Performance issues
- User session replays
- Error trends and alerts

## 🎯 **Key Metrics to Track**

For your food delivery app, focus on:

1. **User Engagement:**
   - Menu page views
   - Item detail page views
   - Search usage
   - Category filtering

2. **Conversion Metrics:**
   - Add to cart rate
   - Checkout completion rate
   - Order success rate
   - Average order value

3. **Performance:**
   - Page load times
   - Image loading performance
   - Mobile vs desktop performance

4. **Errors:**
   - Payment failures
   - API call errors
   - Form submission errors

## 🔔 **Setting Up Alerts**

### Sentry Alerts
- Set up email/Slack notifications for errors
- Configure performance threshold alerts
- Set up issue assignment rules

### Custom Monitoring
- Monitor order completion rates
- Track payment success rates
- Monitor API response times

## 📱 **Mobile Analytics**

Track mobile-specific metrics:
- Touch interactions
- Scroll behavior
- Mobile checkout flow
- App-like behavior (if PWA)

## 🛠️ **Troubleshooting**

Common issues and solutions:
- Analytics not showing data (wait 24-48 hours)
- Sentry errors not appearing (check DSN configuration)
- Performance issues (check Speed Insights recommendations)

Your analytics and monitoring setup is now complete! 📊