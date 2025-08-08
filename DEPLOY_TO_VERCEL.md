# 🚀 Deploy to Vercel - Complete Guide

This guide will walk you through deploying your FoodieExpress app to Vercel with proper environment variable configuration.

## 📋 Pre-Deployment Checklist

### ✅ 1. Verify Your App is Ready

First, ensure your app works locally:

```bash
cd /project/workspace/food-delivery-app
npm run build
```

If the build succeeds, you're ready to deploy!

### ✅ 2. Environment Variables

You'll need these environment variables for production:

```env
# MicroCMS Configuration (Required for content)
MICROCMS_SERVICE_DOMAIN=your-service-name
MICROCMS_API_KEY=your-api-key

# NextAuth Configuration (Required for authentication)
NEXTAUTH_URL=https://your-app-name.vercel.app
NEXTAUTH_SECRET=generate-a-strong-random-string

# Stripe Configuration (Required for payments)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_or_test_key
STRIPE_SECRET_KEY=sk_live_or_test_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-app-name.vercel.app
```

## 🔧 Step 1: Prepare Your Repository

### Option A: GitHub Repository (Recommended)

1. **Create a new GitHub repository:**
   - Go to [github.com](https://github.com) and create a new repository
   - Name it `foodie-express` or similar
   - Don't initialize with README (you already have one)

2. **Push your code to GitHub:**
   ```bash
   cd /project/workspace/food-delivery-app
   git init
   git add .
   git commit -m "Initial commit - FoodieExpress app"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

### Option B: Direct Upload to Vercel

If you prefer not to use Git, you can upload directly to Vercel using their CLI.

## 🌐 Step 2: Deploy to Vercel

### Method 1: GitHub Integration (Recommended)

1. **Go to Vercel Dashboard:**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/Sign in with your GitHub account

2. **Import Your Repository:**
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Next.js app

3. **Configure Project Settings:**
   - **Project Name:** `foodie-express` (or your preferred name)
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

### Method 2: Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy from your project directory:**
   ```bash
   cd /project/workspace/food-delivery-app
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? **N**
   - Project name: **foodie-express**
   - Directory: **./app** (current directory)
   - Want to override settings? **N**

## ⚙️ Step 3: Configure Environment Variables

### In Vercel Dashboard:

1. **Go to your project settings:**
   - Navigate to your project in Vercel dashboard
   - Click "Settings" tab
   - Click "Environment Variables" in the sidebar

2. **Add each environment variable:**

   | Name | Value | Environment |
   |------|-------|-------------|
   | `MICROCMS_SERVICE_DOMAIN` | `your-service-name` | Production, Preview |
   | `MICROCMS_API_KEY` | `your-actual-api-key` | Production, Preview |
   | `NEXTAUTH_URL` | `https://your-app.vercel.app` | Production |
   | `NEXTAUTH_URL` | `https://your-app-git-main.vercel.app` | Preview |
   | `NEXTAUTH_SECRET` | `your-generated-secret` | Production, Preview |
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Production, Preview |
   | `STRIPE_SECRET_KEY` | `sk_test_...` | Production, Preview |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Production |
   | `NEXT_PUBLIC_APP_URL` | `https://your-app-git-main.vercel.app` | Preview |

### Via Vercel CLI:

```bash
# Add environment variables via CLI
vercel env add MICROCMS_SERVICE_DOMAIN
vercel env add MICROCMS_API_KEY
vercel env add NEXTAUTH_SECRET
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_SECRET_KEY
```

## 🔑 Step 4: Generate Required Secrets

### NextAuth Secret

Generate a strong random string for `NEXTAUTH_SECRET`:

```bash
# Option 1: Using OpenSSL
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Option 3: Online generator
# Visit: https://generate-secret.vercel.app/32
```

### Stripe Keys

1. **Get Stripe Keys:**
   - Go to [dashboard.stripe.com](https://dashboard.stripe.com)
   - Navigate to "Developers" → "API keys"
   - Copy your publishable key (`pk_test_...`) and secret key (`sk_test_...`)
   - For production, use live keys (`pk_live_...` and `sk_live_...`)

## 🔄 Step 5: Redeploy with Environment Variables

After adding all environment variables:

1. **Trigger a new deployment:**
   - In Vercel dashboard, go to "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - Check "Use existing Build Cache" = **No**

2. **Or push a new commit:**
   ```bash
   git add .
   git commit -m "Add deployment configuration"
   git push
   ```

## ✅ Step 6: Test Your Deployment

### 1. Basic Functionality Test

Visit your deployed app and check:

- ✅ Home page loads with proper styling
- ✅ Navigation works
- ✅ Menu page displays items
- ✅ Cart functionality works
- ✅ No console errors in browser dev tools

### 2. MicroCMS Integration Test

If you've set up MicroCMS:

- ✅ Featured items show on home page
- ✅ Categories display correctly
- ✅ Menu items load from CMS
- ✅ Individual item pages work

### 3. Environment Variables Test

Check that environment variables are working:

- ✅ `NEXT_PUBLIC_` variables are accessible in browser
- ✅ Server-side variables work for API calls
- ✅ No environment variable values exposed in browser

## 🛠️ Step 7: Configure Custom Domain (Optional)

### Add Custom Domain:

1. **In Vercel Dashboard:**
   - Go to your project settings
   - Click "Domains" tab
   - Add your custom domain (e.g., `foodieexpress.com`)

2. **Update Environment Variables:**
   - Change `NEXTAUTH_URL` to your custom domain
   - Update `NEXT_PUBLIC_APP_URL` to your custom domain
   - Redeploy the app

3. **DNS Configuration:**
   - Point your domain to Vercel's servers
   - Vercel will provide the exact DNS records needed

## 🚨 Troubleshooting

### Build Failures

```bash
# Common issues and solutions:

# 1. TypeScript errors
npm run build  # Run locally first to identify issues

# 2. Missing dependencies
npm install    # Ensure all dependencies are installed

# 3. Environment variable issues
# Check that all required variables are set in Vercel dashboard
```

### Runtime Errors

1. **Check Vercel Function Logs:**
   - Go to your project in Vercel dashboard
   - Click "Functions" tab
   - View logs for any errors

2. **Environment Variable Issues:**
   - Verify all variables are set correctly
   - Check that `NEXTAUTH_URL` matches your actual domain
   - Ensure no typos in variable names

3. **MicroCMS Connection Issues:**
   - Verify API credentials are correct
   - Check that MicroCMS service is accessible
   - Test API endpoints directly

### Performance Optimization

1. **Enable Image Optimization:**
   - Vercel automatically optimizes images
   - Ensure you're using Next.js `Image` component

2. **Configure Caching:**
   - Vercel handles caching automatically
   - For MicroCMS, consider adding ISR (Incremental Static Regeneration)

## 📊 Step 8: Monitor Your Deployment

### Vercel Analytics

1. **Enable Analytics:**
   - Go to your project settings
   - Enable Vercel Analytics for performance insights

2. **Monitor Performance:**
   - Check Core Web Vitals
   - Monitor page load times
   - Track user interactions

### Error Monitoring

Consider adding error monitoring:

```bash
npm install @vercel/analytics
```

## 🎉 Deployment Complete!

Your food delivery app is now live on Vercel! Here's what you have:

✅ **Fully deployed Next.js app**
✅ **Environment variables configured**
✅ **Automatic deployments on Git push**
✅ **SSL certificate (HTTPS)**
✅ **Global CDN distribution**
✅ **Performance optimization**

## 🔄 Continuous Deployment

Every time you push to your main branch:
1. Vercel automatically builds your app
2. Runs tests and checks
3. Deploys to production
4. Updates your live site

## 📱 Share Your App

Your app is now accessible at:
- **Production URL:** `https://your-app-name.vercel.app`
- **Custom Domain:** `https://your-custom-domain.com` (if configured)

---

🎊 **Congratulations!** Your FoodieExpress app is now live and ready for users!