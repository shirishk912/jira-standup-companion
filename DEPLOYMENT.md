# Deployment Guide

## 🚀 Deploying to Vercel + Render

### Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Render account (sign up at render.com)
- Your Jira API credentials

---

## 📦 Backend Deployment (Render)

### Step 1: Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `shirishk912/jira-standup-companion`
   - Click "Connect"

3. **Configure the Service**
   ```
   Name: standup-companion-backend
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

4. **Add Environment Variables**
   
   Click "Advanced" → "Add Environment Variable" and add:
   ```
   JIRA_URL=https://your-domain.atlassian.net
   JIRA_EMAIL=your-email@example.com
   JIRA_API_TOKEN=your-api-token
   JIRA_PROJECT_KEY=YOUR_PROJECT_KEY
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your backend URL (e.g., `https://standup-companion-backend.onrender.com`)

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Update API URL

Before deploying, update the frontend to use your Render backend URL:

1. Create `client/.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

2. Update `client/src/App.jsx`:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import your GitHub repository: `shirishk912/jira-standup-companion`

3. **Configure Project**
   ```
   Framework Preset: Vite
   Root Directory: client
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**
   
   In "Environment Variables" section:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Your app will be live at `https://your-app.vercel.app`

---

## ✅ Post-Deployment

### Test Your Deployment

1. Visit your Vercel URL
2. Check if users and tickets load
3. Test the timer and navigation
4. Verify ticket modal opens correctly

### Common Issues

**Issue: CORS errors**
- Add CORS configuration in `server/index.js`:
  ```javascript
  app.use(cors({
    origin: 'https://your-app.vercel.app'
  }));
  ```

**Issue: Backend cold starts**
- Render free tier spins down after 15 min
- First request after inactivity takes ~30 seconds
- Consider upgrading to paid tier for production use

**Issue: Environment variables not working**
- Double-check all env vars are set correctly
- Redeploy after adding new variables

---

## 🔄 Continuous Deployment

Both platforms auto-deploy on git push:

1. Make changes locally
2. Commit and push to GitHub
3. Vercel and Render automatically redeploy

---

## 💰 Cost Breakdown

**Free Tier Limits:**
- **Vercel:** Unlimited bandwidth, 100GB/month
- **Render:** 750 hours/month (enough for 1 service)

**If you need more:**
- Vercel Pro: $20/month
- Render Starter: $7/month

---

## 🎯 Alternative: Deploy Both on Render

If you prefer one platform:

1. Deploy backend as "Web Service" (as above)
2. Deploy frontend as "Static Site":
   - Root Directory: `client`
   - Build Command: `npm install && npm run build`
   - Publish Directory: `dist`

This keeps everything in one place but uses more of your free hours.

---

## 📝 Custom Domain (Optional)

**Vercel:**
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as instructed

**Render:**
1. Go to Service Settings → Custom Domain
2. Add your domain
3. Update DNS records

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Check deployment logs for errors
