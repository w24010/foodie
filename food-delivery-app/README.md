# FoodieDelight - Food Delivery App 🍕

A modern, vibrant food delivery application built with React, TypeScript, and microCMS.io integration. Features a bright design, comprehensive restaurant management, and seamless ordering experience.

## ✨ Features

### 🎨 Bright & Modern Design
- Vibrant color scheme with food-focused oranges, reds, and greens
- Responsive design that works perfectly on all devices
- Smooth animations and hover effects
- Professional yet appetizing visual appeal

### 🍽️ Complete Food Delivery Experience
- **Restaurant Discovery**: Browse featured restaurants with ratings and delivery info
- **Category Exploration**: Multiple food categories (Pizza, Burgers, Sushi, Mexican, Chinese, Desserts, etc.)
- **Menu Management**: Dynamic menu items with detailed descriptions and pricing
- **Shopping Cart**: Full cart functionality with quantity management
- **Search & Filter**: Real-time search for restaurants and menu items
- **Order Tracking**: Visual order status and delivery tracking

### 🔌 microCMS.io Integration
- **Dynamic Content**: All restaurants, menu items, and categories managed via microCMS
- **Real-time Updates**: Content updates reflect immediately on the website
- **Optimized Images**: Automatic image optimization and responsive sizing
- **SEO Friendly**: Meta tags and structured data from CMS content

### 🛠️ Technical Stack
- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS V4, ShadCN UI components
- **State Management**: Zustand for cart, React Query for data fetching
- **CMS**: microCMS.io with full API integration
- **Icons**: Lucide React for consistent iconography

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and Bun
- microCMS.io account (free tier available)

### 1. Clone and Install
```bash
# Install dependencies
bun install
```

### 2. microCMS.io Setup

#### Create microCMS Service
1. Sign up at [microCMS.io](https://microcms.io/)
2. Create a new service (e.g., "foodie-delight")
3. Note your service domain and create an API key

#### Create APIs in microCMS
Create these three APIs in your microCMS service:

**1. Restaurants API (`restaurants`)**
```
Fields:
- name (Text)
- description (Text Area)
- category (Text)
- rating (Number)
- deliveryTime (Text)
- deliveryFee (Number)
- image (Media)
- featured (Boolean)
- address (Text)
- phone (Text)
- tags (Text - Multiple)
- openingHours (Custom Field)
```

**2. Menu Items API (`menu-items`)**
```
Fields:
- name (Text)
- description (Text Area)
- price (Number)
- category (Text)
- restaurant (Text)
- image (Media)
- popular (Boolean)
- dietary (Text - Multiple)
- ingredients (Text - Multiple)
- nutritionInfo (Custom Field)
```

**3. Categories API (`categories`)**
```
Fields:
- name (Text)
- description (Text)
- icon (Text)
- image (Media)
- color (Text)
- sortOrder (Number)
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your microCMS credentials
REACT_APP_MICROCMS_SERVICE_DOMAIN=your-service-domain
REACT_APP_MICROCMS_API_KEY=your-api-key
```

### 4. Development

```bash
# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## 📱 Key Components

### Cart Management
- Global state management with Zustand
- Add/remove items with quantity controls
- Real-time total calculation
- Persistent cart across sessions

### microCMS Integration
```typescript
// Example: Fetching restaurants
import { useFeaturedRestaurants } from '@/hooks/useMicroCMS';

const { data: restaurants, isLoading } = useFeaturedRestaurants();
```

### Search Functionality
- Debounced search with React Query
- Search across restaurants and menu items
- Category filtering
- Real-time results

## 🎯 Content Management

### Adding Restaurants
1. Go to your microCMS dashboard
2. Navigate to "Restaurants" API
3. Click "Add Content"
4. Fill in restaurant details:
   - Upload appetizing restaurant images
   - Set accurate delivery times and fees
   - Mark popular restaurants as "featured"

### Managing Menu Items
1. Create menu items in "Menu Items" API
2. Link to restaurants by name
3. Set categories (Pizza, Burgers, etc.)
4. Mark popular items for homepage display
5. Add dietary information (vegetarian, vegan, etc.)

### Category Management
1. Create food categories in "Categories" API
2. Use emoji icons for visual appeal
3. Set sort order for homepage display
4. Assign colors for category badges

## 🎨 Customization

### Color Scheme
The app uses a bright, food-focused color palette:
- **Primary**: Warm orange (oklch(0.65 0.22 35))
- **Accent**: Fresh green (oklch(0.85 0.18 120))
- **Secondary**: Soft yellow (oklch(0.95 0.08 60))
- **Background**: Warm cream (oklch(0.98 0.02 50))

### Tailwind Configuration
Colors are defined in `src/index.css` using OKLCH color space for vibrant, consistent colors.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### Netlify
```bash
# Build command: bun run build
# Publish directory: dist
# Add environment variables in site settings
```

## 📊 Performance

- **Image Optimization**: Automatic WebP conversion via microCMS
- **Code Splitting**: Automatic with Vite
- **Caching**: React Query with 5-minute stale time
- **Bundle Size**: Optimized with tree-shaking

## 🧪 Testing Content

For development/testing, the app includes mock data that demonstrates:
- 6 restaurants across different cuisines
- 6 popular menu items
- 8 food categories
- Complete cart functionality

## 📝 API Documentation

See `src/lib/microcms.ts` for complete API functions and TypeScript types.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make changes with tests
4. Submit a pull request

## 📄 License

MIT License - feel free to use for personal and commercial projects.

---

**Built with Scout** - The AI-powered development platform that created this entire food delivery app, including microCMS integration, responsive design, and comprehensive functionality.