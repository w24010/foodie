# 🧪 Testing Your MicroCMS Integration

After completing the MicroCMS setup, follow these steps to test the integration:

## ✅ Step 1: Environment Check

1. Ensure your `.env.local` file has the correct values:
```env
MICROCMS_SERVICE_DOMAIN=your-service-name
MICROCMS_API_KEY=your-actual-api-key
```

2. Restart your development server:
```bash
npm run dev
```

## 🔍 Step 2: Test the Pages

### Home Page (/)
- Should show featured items from MicroCMS
- Categories should display with real data
- If MicroCMS is not configured, page will show empty sections gracefully

### Menu Page (/menu)
- Should list all available menu items
- Search and filtering should work
- Categories dropdown should show real categories

### Individual Item Pages (/menu/[slug])
- Navigate to specific items using the slugs you created
- Should show detailed information from MicroCMS

## 🚨 Troubleshooting

### No Items Showing?

1. **Check the browser console** for error messages
2. **Verify API credentials** in `.env.local`
3. **Check MicroCMS content**:
   - Ensure items are published (not draft)
   - Verify `available` field is set to `true`
   - Check that category references are properly set

### API Errors?

1. **Service Domain Format**: Should be just the service name, not the full URL
   - ✅ Correct: `my-service`
   - ❌ Wrong: `https://my-service.microcms.io`

2. **API Key**: Copy the full key from MicroCMS dashboard

### TypeScript Errors?

The app is designed to work with or without MicroCMS. If you see TypeScript errors:

1. Restart your development server
2. Check that all imports are correct
3. Ensure `.env.local` is in the root directory

## 📝 Sample Content for Testing

Add this sample data to your MicroCMS to test the integration:

### Categories

1. **Pizza**
   - Slug: `pizza`
   - Description: `Wood-fired pizzas with fresh ingredients`

2. **Burgers**
   - Slug: `burgers`
   - Description: `Juicy burgers with premium ingredients`

### Menu Items

1. **Margherita Pizza**
   - Slug: `margherita-pizza`
   - Price: `16.99`
   - Category: Pizza
   - Featured: `true`
   - Available: `true`
   - Ingredients: `Fresh Mozzarella, Tomatoes, Basil`
   - Calories: `280`

## 🎯 Expected Behavior

When properly configured:
- ✅ Home page shows real featured items and categories
- ✅ Menu page displays all items with working filters
- ✅ Individual item pages show detailed information
- ✅ Add to cart functionality works with real data
- ✅ Search and filtering work across real content

## 🔄 Fallback Behavior

If MicroCMS is not configured:
- ✅ Pages load without errors
- ✅ Empty states are shown gracefully
- ✅ No broken functionality
- ✅ Console shows helpful error messages

## 🚀 Next Steps

Once MicroCMS is working:

1. **Add more content** through the MicroCMS dashboard
2. **Upload images** for better visual presentation
3. **Set up webhooks** for automatic deployment on content updates
4. **Configure image optimization** in MicroCMS settings

## 💡 Pro Tips

- Use consistent image sizes (800x600px for main images)
- Write SEO-friendly descriptions
- Use clear, URL-friendly slugs
- Set up content validation rules in MicroCMS
- Consider using MicroCMS preview functionality

---

Your food delivery app is now ready to use real content management! 🎉