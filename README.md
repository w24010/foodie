# 🍕 FoodieExpress - Modern Food Delivery App

A comprehensive food delivery application built with Next.js 15, featuring vibrant design, full e-commerce functionality, and seamless user experience.

## ✨ Features

### 🏠 Core Pages
- **Home Page** - Hero section, featured dishes, categories, and call-to-action
- **Menu Listing** - Browse all menu items with search, filters, and sorting
- **Item Detail** - Detailed view of individual dishes with nutrition info
- **Shopping Cart** - Add/remove items, quantity management, persistent storage
- **Checkout** - Complete order flow with address and payment
- **User Authentication** - Sign up and login with form validation
- **Dashboard** - User profile, order history, favorites, and settings

### 🎨 Design Features
- **Vibrant Color Scheme** - Red, orange, and yellow hunger-inducing colors
- **Fully Responsive** - Mobile-first design that works on all devices
- **Modern UI/UX** - Clean interface with smooth animations and hover effects
- **Accessibility** - Proper ARIA labels and keyboard navigation

### 🛒 E-commerce Features
- **Cart Management** - Persistent cart with localStorage
- **Order Processing** - Complete checkout flow with validation
- **User Accounts** - Registration, login, and profile management
- **Order History** - Track past orders and reorder functionality
- **Favorites** - Save and manage favorite dishes
- **Address Management** - Multiple delivery addresses

### 🔧 Technical Features
- **Next.js 15** - Latest version with App Router
- **TypeScript** - Fully typed for better development experience
- **Tailwind CSS V4** - Modern utility-first CSS framework
- **MicroCMS Integration** - Headless CMS for menu content management
- **Context API** - State management for cart and user data
- **Form Validation** - Comprehensive form handling and validation

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd /project/workspace/food-delivery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The project includes a `.env.local` file with placeholder values. Update these with your actual credentials:
   
   ```env
   # microCMS Configuration
   MICROCMS_SERVICE_DOMAIN=your-service-domain
   MICROCMS_API_KEY=your-api-key
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret
   
   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```
food-delivery-app/
├── src/
│   ├── app/                     # Next.js 15 App Router
│   │   ├── cart/                # Shopping cart page
│   │   ├── checkout/            # Checkout process
│   │   ├── dashboard/           # User dashboard
│   │   ├── login/               # Login page
│   │   ├── menu/                # Menu listing and item details
│   │   ├── signup/              # Registration page
│   │   ├── layout.tsx           # Root layout with providers
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles with custom CSS
│   ├── components/              # Reusable UI components
│   │   ├── Header.tsx           # Navigation header
│   │   ├── Footer.tsx           # Site footer
│   │   ├── MenuCard.tsx         # Menu item display component
│   │   └── CartItem.tsx         # Cart item component
│   ├── context/                 # React Context providers
│   │   └── CartContext.tsx      # Shopping cart state management
│   └── lib/                     # Utility functions and configurations
│       ├── microcms.ts          # MicroCMS client and types
│       └── utils.ts             # Helper functions (formatting, etc.)
├── public/                      # Static assets
├── .env.local                   # Environment variables
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
└── next.config.js               # Next.js configuration
```

## 🎯 Key Components

### CartContext
Manages global cart state using React Context and useReducer:
- Add/remove items
- Update quantities
- Persistent storage with localStorage
- Calculate totals and item counts

### MicroCMS Integration
Handles content management for menu items:
- TypeScript interfaces for menu items and categories
- API functions for fetching data
- Support for filtering and pagination

### Form Validation
Comprehensive validation for all forms:
- Email and password validation
- Real-time error feedback
- Password strength indicators
- Accessibility-compliant error messages

## 🎨 Design System

### Color Palette
- **Primary Red**: #ef4444 (red-500)
- **Secondary Orange**: #f97316 (orange-500)
- **Accent Yellow**: #fbbf24 (amber-400)
- **Success Green**: #10b981 (emerald-500)
- **Text Gray**: #1f2937 (gray-800)

### Typography
- **Headings**: Inter font family, bold weights
- **Body Text**: Inter font family, regular weights
- **UI Elements**: Consistent sizing and spacing

### Components
- **Buttons**: Vibrant gradients with hover effects
- **Cards**: Subtle shadows with hover animations
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with mobile menu

## 🔗 Pages and Features

### 🏠 Home Page (`/`)
- Hero section with call-to-action
- Featured dishes carousel
- Popular categories grid
- Service features (fast delivery, quality, etc.)

### 🍽️ Menu Pages (`/menu`)
- **Menu Listing** - All items with search and filters
- **Item Detail** (`/menu/[slug]`) - Detailed view with nutrition info

### 🛒 Shopping Flow
- **Cart** (`/cart`) - Review items, apply promos, view totals
- **Checkout** (`/checkout`) - Address, payment, order preferences

### 👤 User Pages
- **Sign Up** (`/signup`) - Account creation with validation
- **Login** (`/login`) - Authentication with demo credentials
- **Dashboard** (`/dashboard`) - Profile, orders, favorites, settings

## 🔧 Configuration

### MicroCMS Setup
1. Create a MicroCMS account
2. Set up content models for:
   - Menu Items (name, description, price, image, category, etc.)
   - Categories (name, description, image)
3. Add your API credentials to `.env.local`

### Stripe Integration
1. Create a Stripe account
2. Get your publishable and secret keys
3. Add them to `.env.local`
4. Implement webhook handlers for payment processing

### NextAuth Configuration
1. Set up authentication providers (Google, Facebook, etc.)
2. Configure session handling
3. Add authentication middleware for protected routes

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktop** (1024px+)

Features include:
- Mobile-first navigation with hamburger menu
- Touch-friendly interface elements
- Optimized images for different screen sizes
- Swipe gestures for carousels

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean App Platform
- Railway

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent naming conventions

## 🔒 Security

- Environment variables for sensitive data
- Input validation and sanitization
- Secure authentication flow
- HTTPS in production
- XSS protection

## 🎯 Future Enhancements

- **Real-time order tracking** with WebSockets
- **Push notifications** for order updates
- **Advanced filtering** (dietary restrictions, ratings)
- **Restaurant management** portal
- **Loyalty program** integration
- **Social sharing** features
- **Progressive Web App** (PWA) capabilities

## 🐛 Troubleshooting

### Common Issues

1. **Build errors**: Check TypeScript types and imports
2. **Styling issues**: Verify Tailwind CSS is properly configured
3. **API errors**: Check environment variables and API credentials
4. **Cart not persisting**: Ensure localStorage is available

### Getting Help

1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check Next.js and React versions compatibility

## 📄 License

This project is built for demonstration purposes. Feel free to use and modify for your own projects.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS