# 🚀 Complete Setup Guide: microCMS.io + FoodieDelight

## 📥 Download Your Code

The complete FoodieDelight project is located at `/project/workspace/food-delivery-app/`. You can access all files and download them to your local machine.

### Project Structure
```
food-delivery-app/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── components/ui/          # ShadCN UI components
│   ├── hooks/
│   │   └── useMicroCMS.ts     # Custom hooks for microCMS
│   ├── lib/
│   │   └── microcms.ts        # microCMS client & API functions
│   └── index.css              # Bright color theme
├── .env.example               # Environment variables template
├── README.md                  # Complete documentation
├── package.json              # Dependencies
└── vite.config.ts            # Vite configuration
```

---

## 🏗️ Step 1: Create microCMS.io Account

### 1.1 Sign Up
1. Go to [microCMS.io](https://microcms.io/)
2. Click "Start for Free" 
3. Sign up with your email or GitHub account
4. Verify your email address

### 1.2 Create a Service
1. After login, click "Create Service"
2. Enter service name: `foodie-delight` (or your preferred name)
3. Choose a plan (Free plan is perfect for starting)
4. Click "Create Service"

**Important**: Note your **Service Domain** (e.g., `foodie-delight.microcms.io`)

---

## 🔑 Step 2: Create API Key

1. In your microCMS dashboard, go to **Service Settings**
2. Click on **API Keys** tab
3. Click **Create API Key**
4. Name: `FoodieDelight Website`
5. Permissions: Select **GET** (for reading content)
6. Click **Create**
7. **Copy and save the API key** - you won't see it again!

---

## 📊 Step 3: Create APIs

You need to create 3 APIs in your microCMS service:

### 3.1 Restaurants API

1. Click **API** in the left sidebar
2. Click **Create API**
3. API ID: `restaurants`
4. API Name: `Restaurants`
5. API Type: **List Format**

**Add these fields:**

| Field ID | Field Name | Type | Required |
|----------|------------|------|----------|
| `name` | Restaurant Name | Text | ✅ |
| `description` | Description | Text Area | ✅ |
| `category` | Category | Text | ✅ |
| `rating` | Rating | Number | ✅ |
| `deliveryTime` | Delivery Time | Text | ✅ |
| `deliveryFee` | Delivery Fee | Number | ✅ |
| `image` | Image | Media | ✅ |
| `featured` | Featured | Boolean | ❌ |
| `address` | Address | Text | ✅ |
| `phone` | Phone | Text | ❌ |

### 3.2 Menu Items API

1. Create new API
2. API ID: `menu-items`
3. API Name: `Menu Items`
4. API Type: **List Format**

**Add these fields:**

| Field ID | Field Name | Type | Required |
|----------|------------|------|----------|
| `name` | Item Name | Text | ✅ |
| `description` | Description | Text Area | ✅ |
| `price` | Price | Number | ✅ |
| `category` | Category | Text | ✅ |
| `restaurant` | Restaurant | Text | ✅ |
| `image` | Image | Media | ✅ |
| `popular` | Popular | Boolean | ❌ |
| `dietary` | Dietary Info | Text | ❌ |

### 3.3 Categories API

1. Create new API
2. API ID: `categories`
3. API Name: `Categories`
4. API Type: **List Format**

**Add these fields:**

| Field ID | Field Name | Type | Required |
|----------|------------|------|----------|
| `name` | Category Name | Text | ✅ |
| `description` | Description | Text Area | ❌ |
| `icon` | Icon (Emoji) | Text | ✅ |
| `color` | Color Class | Text | ✅ |
| `sortOrder` | Sort Order | Number | ✅ |

---

## 🎯 Step 4: Add Sample Content

### 4.1 Add Categories First
Create these categories:

1. **Pizza**
   - Icon: `🍕`
   - Color: `bg-red-100 text-red-800`
   - Sort Order: `1`

2. **Burgers**
   - Icon: `🍔`
   - Color: `bg-yellow-100 text-yellow-800`
   - Sort Order: `2`

3. **Sushi**
   - Icon: `🍱`
   - Color: `bg-green-100 text-green-800`
   - Sort Order: `3`

### 4.2 Add Sample Restaurant
1. Name: `Bella Italia`
2. Description: `Authentic Italian cuisine with fresh ingredients`
3. Category: `Italian`
4. Rating: `4.8`
5. Delivery Time: `25-40 min`
6. Delivery Fee: `2.99`
7. Featured: `true`
8. Upload a restaurant image

### 4.3 Add Sample Menu Item
1. Name: `Margherita Pizza`
2. Description: `Fresh tomatoes, mozzarella, basil, olive oil`
3. Price: `16.99`
4. Category: `Pizza`
5. Restaurant: `Bella Italia`
6. Popular: `true`
7. Upload a pizza image

---

## ⚙️ Step 5: Configure Your Website

### 5.1 Download the Code
1. Copy all files from `/project/workspace/food-delivery-app/` to your local machine
2. Or use the zip file I'll create for you

### 5.2 Install Dependencies
```bash
cd food-delivery-app
bun install
# or npm install
```

### 5.3 Set Environment Variables
1. Copy `.env.example` to `.env`
```bash
cp .env.example .env
```

2. Edit `.env` with your microCMS credentials:
```env
REACT_APP_MICROCMS_SERVICE_DOMAIN=your-service-domain
REACT_APP_MICROCMS_API_KEY=your-api-key
```

**Example:**
```env
REACT_APP_MICROCMS_SERVICE_DOMAIN=foodie-delight
REACT_APP_MICROCMS_API_KEY=abcd1234-efgh5678-ijkl9012-mnop3456
```

### 5.4 Test the Connection
```bash
bun run dev
```

Visit `http://localhost:5173` - your website should now display content from microCMS!

---

## 🚀 Step 6: Deploy Your Website

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard

### Option 2: Netlify
1. Build command: `bun run build`
2. Publish directory: `dist`
3. Add environment variables in site settings

---

## 🎨 Step 7: Customize Content

### Adding More Restaurants
1. Go to microCMS dashboard
2. Navigate to "Restaurants"
3. Click "Add Content"
4. Fill in details and upload images

### Adding Menu Items
1. Create items in "Menu Items"
2. Link to restaurant by exact name
3. Use categories: Pizza, Burgers, Sushi, Mexican, Chinese, Desserts, Italian, Healthy

### Tips for Great Content
- **Images**: Use high-quality, appetizing food photos
- **Descriptions**: Write mouth-watering descriptions
- **Categories**: Keep consistent naming
- **Featured**: Mark your best restaurants as featured
- **Popular**: Mark trending menu items as popular

---

## 🆘 Troubleshooting

### Common Issues

**"Failed to fetch from microCMS"**
- Check your API key is correct
- Ensure your service domain is right
- Verify your APIs are published

**"Content not showing"**
- Make sure you've added content to microCMS
- Check field names match exactly
- Verify APIs are set to "List Format"

**Build errors**
- Run `bun install` to ensure dependencies
- Check environment variables are set
- Verify TypeScript types match your content

---

## 📞 Need Help?

- **microCMS Documentation**: [docs.microcms.io](https://docs.microcms.io/)
- **React Query Docs**: For data fetching
- **Zustand Docs**: For state management

Your FoodieDelight website is ready to go! 🎉