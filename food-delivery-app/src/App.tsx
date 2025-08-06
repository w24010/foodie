import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { create } from 'zustand';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  ShoppingCart, 
  Clock, 
  Star, 
  Plus, 
  Minus,
  MapPin,
  Phone,
  Heart,
  Filter,
  Truck,
  CheckCircle,
  User
} from 'lucide-react';

// Store for cart management
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurant: string;
  image?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id);
    if (existingItem) {
      return {
        items: state.items.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      };
    } else {
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: quantity <= 0 
      ? state.items.filter(item => item.id !== id)
      : state.items.map(item => 
          item.id === id ? { ...item, quantity } : item
        )
  })),
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  }
}));

// Mock data for menu items (would come from microCMS.io)
const mockMenuData = {
  restaurants: [
    {
      id: '1',
      name: 'Bella Italia',
      category: 'Italian',
      rating: 4.8,
      deliveryTime: '25-40 min',
      deliveryFee: 2.99,
      image: '/api/placeholder/300/200',
      featured: true
    },
    {
      id: '2',
      name: 'Burger Palace',
      category: 'American',
      rating: 4.6,
      deliveryTime: '20-35 min',
      deliveryFee: 1.99,
      image: '/api/placeholder/300/200',
      featured: true
    },
    {
      id: '3',
      name: 'Sushi Zen',
      category: 'Japanese',
      rating: 4.9,
      deliveryTime: '30-45 min',
      deliveryFee: 3.99,
      image: '/api/placeholder/300/200',
      featured: false
    },
    {
      id: '4',
      name: 'Taco Fiesta',
      category: 'Mexican',
      rating: 4.7,
      deliveryTime: '15-25 min',
      deliveryFee: 1.49,
      image: '/api/placeholder/300/200',
      featured: true
    },
    {
      id: '5',
      name: 'Dragon Palace',
      category: 'Chinese',
      rating: 4.5,
      deliveryTime: '25-40 min',
      deliveryFee: 2.49,
      image: '/api/placeholder/300/200',
      featured: false
    },
    {
      id: '6',
      name: 'Sweet Dreams',
      category: 'Desserts',
      rating: 4.8,
      deliveryTime: '20-30 min',
      deliveryFee: 2.99,
      image: '/api/placeholder/300/200',
      featured: false
    }
  ],
  menuItems: [
    {
      id: '1',
      name: 'Margherita Pizza',
      description: 'Fresh tomatoes, mozzarella, basil, olive oil',
      price: 16.99,
      category: 'Pizza',
      restaurant: 'Bella Italia',
      image: '/api/placeholder/250/200',
      popular: true
    },
    {
      id: '2',
      name: 'Classic Cheeseburger',
      description: 'Beef patty, cheese, lettuce, tomato, onion, pickles',
      price: 12.99,
      category: 'Burgers',
      restaurant: 'Burger Palace',
      image: '/api/placeholder/250/200',
      popular: true
    },
    {
      id: '3',
      name: 'Salmon Sashimi',
      description: 'Fresh salmon, wasabi, pickled ginger',
      price: 18.99,
      category: 'Sushi',
      restaurant: 'Sushi Zen',
      image: '/api/placeholder/250/200',
      popular: false
    },
    {
      id: '4',
      name: 'Chicken Tacos',
      description: 'Grilled chicken, salsa, avocado, cilantro',
      price: 9.99,
      category: 'Mexican',
      restaurant: 'Taco Fiesta',
      image: '/api/placeholder/250/200',
      popular: true
    },
    {
      id: '5',
      name: 'Kung Pao Chicken',
      description: 'Spicy chicken, peanuts, vegetables, chili sauce',
      price: 14.99,
      category: 'Chinese',
      restaurant: 'Dragon Palace',
      image: '/api/placeholder/250/200',
      popular: false
    },
    {
      id: '6',
      name: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center',
      price: 7.99,
      category: 'Desserts',
      restaurant: 'Sweet Dreams',
      image: '/api/placeholder/250/200',
      popular: true
    }
  ],
  categories: [
    { id: 'pizza', name: 'Pizza', icon: '🍕', color: 'bg-red-100 text-red-800' },
    { id: 'burgers', name: 'Burgers', icon: '🍔', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'sushi', name: 'Sushi', icon: '🍱', color: 'bg-green-100 text-green-800' },
    { id: 'mexican', name: 'Mexican', icon: '🌮', color: 'bg-orange-100 text-orange-800' },
    { id: 'chinese', name: 'Chinese', icon: '🥡', color: 'bg-purple-100 text-purple-800' },
    { id: 'desserts', name: 'Desserts', icon: '🍰', color: 'bg-pink-100 text-pink-800' },
    { id: 'italian', name: 'Italian', icon: '🍝', color: 'bg-blue-100 text-blue-800' },
    { id: 'healthy', name: 'Healthy', icon: '🥗', color: 'bg-emerald-100 text-emerald-800' }
  ]
};

// Header Component
function Header() {
  const { getTotalItems } = useCartStore();
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent text-white font-bold">
              F
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              FoodieDelight
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Restaurants</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Categories</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Deals</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for food..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          
          <CartSheet>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </CartSheet>
        </div>
      </div>
    </header>
  );
}

// Cart Sheet Component
function CartSheet({ children }: { children: React.ReactNode }) {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {items.length === 0 ? 'Your cart is empty' : `${items.length} items in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground">Add some delicious food to get started!</p>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <img 
                  src={item.image || '/api/placeholder/60/60'} 
                  alt={item.name}
                  className="h-12 w-12 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                  <p className="text-sm font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total: ${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Button className="w-full" size="lg">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Proceed to Checkout
                </Button>
                <Button variant="outline" className="w-full" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Hero Section
function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
      <div className="container max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          Delicious Food,
          <br />
          Delivered Fast
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Order from your favorite restaurants and get fresh, hot food delivered to your door in minutes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Enter your address"
              className="pl-12 h-14 text-lg"
            />
            <MapPin className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <Button size="lg" className="h-14 px-8 text-lg">
            <Search className="mr-2 h-5 w-5" />
            Find Food
          </Button>
        </div>
        
        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span>Top Rated</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            <span>Live Tracking</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection() {
  const categories = mockMenuData.categories;
  
  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Explore Categories</h2>
          <p className="text-muted-foreground">Discover food from various cuisines</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-medium text-sm">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Featured Restaurants Section
function FeaturedRestaurants() {
  const featuredRestaurants = mockMenuData.restaurants.filter(r => r.featured);
  
  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Restaurants</h2>
          <p className="text-muted-foreground">Top-rated restaurants near you</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Restaurant Card Component
function RestaurantCard({ restaurant }: { restaurant: any }) {
  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Button size="icon" variant="secondary" className="rounded-full">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <Badge className="absolute bottom-4 left-4">
          {restaurant.category}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            <span className="text-sm font-medium">{restaurant.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <span>Delivery ${restaurant.deliveryFee}</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Popular Menu Items Section
function PopularMenuItems() {
  const { addItem } = useCartStore();
  const popularItems = mockMenuData.menuItems.filter(item => item.popular);
  
  return (
    <section className="py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Right Now</h2>
          <p className="text-muted-foreground">Most ordered items today</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularItems.map((item) => (
            <Card key={item.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                  Popular
                </Badge>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                <p className="text-xs text-muted-foreground mb-4">{item.restaurant}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">${item.price}</span>
                  <Button 
                    onClick={() => addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      restaurant: item.restaurant,
                      image: item.image
                    })}
                    className="group/btn"
                  >
                    <Plus className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-muted py-16 px-4">
      <div className="container max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-primary to-accent text-white font-bold">
                F
              </div>
              <h3 className="text-xl font-bold">FoodieDelight</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Delivering happiness, one meal at a time. Fresh, fast, and always delicious.
            </p>
            <div className="flex gap-4">
              <Button size="icon" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <MapPin className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Privacy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get the App</h4>
            <p className="text-muted-foreground mb-4">
              Download our app for faster ordering and exclusive deals!
            </p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <span className="mr-2">📱</span>
                Download iOS App
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <span className="mr-2">🤖</span>
                Download Android App
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 FoodieDelight. All rights reserved. | Powered by microCMS.io</p>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <CategoriesSection />
          <FeaturedRestaurants />
          <PopularMenuItems />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
