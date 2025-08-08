# 🚀 MicroCMS Setup Guide for FoodieExpress

This guide will walk you through setting up MicroCMS with the exact content models needed for your food delivery app.

## 📋 Step 1: Create MicroCMS Account

1. Go to [https://microcms.io/](https://microcms.io/)
2. Click "Sign up for free"
3. Create your account and verify email
4. Create a new service (choose a service name like "foodie-express")

## 🏗️ Step 2: Create Content Models

### Categories Content Model

1. In your MicroCMS dashboard, click **"APIs"** → **"Create API"**
2. Set **API ID**: `categories`
3. Set **API Name**: `Categories`
4. Choose **List Format** (not Object)
5. Click **Create**

#### Categories Schema Fields:

| Field ID | Field Name | Type | Required | Settings |
|----------|------------|------|----------|----------|
| `name` | Category Name | Text | ✅ | Max length: 50 |
| `slug` | URL Slug | Text | ✅ | Max length: 50, Pattern: `^[a-z0-9-]+$` |
| `description` | Description | Text Area | ❌ | Max length: 200 |
| `image` | Category Image | Media | ✅ | Image only |

**To add each field:**
1. Click **"Add Field"**
2. Select field type
3. Enter Field ID and Field Name
4. Set required/optional
5. Add validation rules
6. Click **Save**

### Menu Items Content Model

1. Click **"APIs"** → **"Create API"**
2. Set **API ID**: `menu-items`
3. Set **API Name**: `Menu Items`
4. Choose **List Format**
5. Click **Create**

#### Menu Items Schema Fields:

| Field ID | Field Name | Type | Required | Settings |
|----------|------------|------|----------|----------|
| `name` | Item Name | Text | ✅ | Max length: 100 |
| `slug` | URL Slug | Text | ✅ | Max length: 100, Pattern: `^[a-z0-9-]+$` |
| `description` | Description | Text Area | ✅ | Max length: 500 |
| `price` | Price | Number | ✅ | Min: 0, Max: 999.99 |
| `image` | Food Image | Media | ✅ | Image only |
| `category` | Category | Reference | ✅ | Reference to Categories API |
| `featured` | Featured Item | Boolean | ❌ | Default: false |
| `available` | Available | Boolean | ❌ | Default: true |
| `ingredients` | Ingredients | Text | ❌ | Multiple values enabled |
| `allergens` | Allergens | Text | ❌ | Multiple values enabled |
| `calories` | Calories | Number | ❌ | Min: 0, Max: 9999 |
| `protein` | Protein (g) | Number | ❌ | Min: 0, Max: 999 |
| `carbs` | Carbohydrates (g) | Number | ❌ | Min: 0, Max: 999 |
| `fat` | Fat (g) | Number | ❌ | Min: 0, Max: 999 |
| `spice_level` | Spice Level | Select | ❌ | Options: Mild, Medium, Hot, Very Hot |
| `prep_time` | Preparation Time | Text | ❌ | Max length: 20 |

**Special Settings:**

For **Reference Field** (category):
1. Choose "Reference" field type
2. Set Field ID: `category`
3. Select reference API: `Categories`
4. Display field: `name`

For **Multiple Text Fields** (ingredients/allergens):
1. Choose "Text" field type
2. Enable "Multiple values"
3. Set max entries (e.g., 10 for ingredients)

## 📝 Step 3: Add Sample Content

### Add Categories:

1. Go to **Categories** API
2. Click **"Add Content"**
3. Add these categories:

#### Pizza
- **Name**: Pizza
- **Slug**: pizza
- **Description**: Authentic wood-fired pizzas with fresh ingredients
- **Image**: Upload pizza image

#### Burgers
- **Name**: Burgers
- **Slug**: burgers  
- **Description**: Juicy burgers with premium beef and fresh toppings
- **Image**: Upload burger image

#### Asian
- **Name**: Asian
- **Slug**: asian
- **Description**: Traditional Asian cuisine with authentic flavors
- **Image**: Upload Asian food image

#### Salads
- **Name**: Salads
- **Slug**: salads
- **Description**: Fresh and healthy salads with organic ingredients
- **Image**: Upload salad image

#### Mexican
- **Name**: Mexican
- **Slug**: mexican
- **Description**: Spicy and flavorful Mexican dishes
- **Image**: Upload Mexican food image

### Add Menu Items:

1. Go to **Menu Items** API
2. Click **"Add Content"**
3. Add sample items:

#### Margherita Pizza
- **Name**: Margherita Pizza
- **Slug**: margherita-pizza
- **Description**: Fresh mozzarella, tomato sauce, basil leaves on wood-fired crust
- **Price**: 16.99
- **Image**: Upload pizza image
- **Category**: Select "Pizza"
- **Featured**: true
- **Available**: true
- **Ingredients**: Fresh Mozzarella, San Marzano Tomatoes, Fresh Basil, Extra Virgin Olive Oil
- **Allergens**: Gluten, Dairy
- **Calories**: 280
- **Protein**: 12
- **Carbs**: 36
- **Fat**: 10
- **Spice Level**: Mild
- **Prep Time**: 12-15 minutes

Add 5-10 more items across different categories for testing.

## 🔑 Step 4: Get API Credentials

1. In MicroCMS dashboard, click **"API Keys"** in the sidebar
2. Copy your **Service Domain** (e.g., `your-service.microcms.io`)
3. Copy your **API Key** (the X-MICROCMS-API-KEY)

## ⚙️ Step 5: Update Environment Variables

Update your `.env.local` file:

```env
# MicroCMS Configuration
MICROCMS_SERVICE_DOMAIN=your-service-name
MICROCMS_API_KEY=your-api-key-here

# Other existing variables...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
```

## 🧪 Step 6: Test the Integration

I'll update your app code to use real MicroCMS data instead of mock data.