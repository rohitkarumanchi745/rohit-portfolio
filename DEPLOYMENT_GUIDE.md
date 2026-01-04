# 🚀 Deployment Guide - Rohit's Portfolio

## Quick Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `rohit-portfolio` (or any name you prefer)
   - Make it **Public** or **Private** (your choice)
   - **DO NOT** initialize with README, .gitignore, or license
   - Click "Create repository"

2. **Connect your local project to GitHub:**

```bash
cd /Users/rohit/rohit-portfolio

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio deployment

🤖 Generated with Claude Code

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/rohit-portfolio.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel

1. **Go to Vercel:**
   - Visit https://vercel.com/signup
   - Sign up with your GitHub account (free)

2. **Import your repository:**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `rohit-portfolio`
   - Click "Import"

3. **Configure the project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)

4. **Add Environment Variable:**
   - Click "Environment Variables"
   - Add: `OPENAI_API_KEY` = `your-api-key-from-.env.local`
   - Click "Add"

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project-name.vercel.app`

### Step 3: Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add your custom domain (e.g., `rohitkarumanchi.com`)
   - Follow DNS configuration instructions

2. **Vercel automatically provides:**
   - ✅ Free SSL certificate
   - ✅ Automatic HTTPS
   - ✅ Global CDN
   - ✅ Automatic deployments on git push

---

## Alternative: Deploy to Netlify

### Step 1: Push to GitHub (same as above)

### Step 2: Deploy to Netlify

1. **Go to Netlify:**
   - Visit https://www.netlify.com/
   - Sign up with GitHub

2. **Import repository:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub → Select `rohit-portfolio`

3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Click "Deploy site"

4. **Add Environment Variables:**
   - Site settings → Environment variables
   - Add `OPENAI_API_KEY`

---

## Environment Variables Needed

Make sure to add these in your deployment platform:

```
OPENAI_API_KEY=your-openai-api-key-here
```

**IMPORTANT:** Never commit `.env.local` to GitHub! It's already in `.gitignore`.

---

## Post-Deployment Checklist

After deploying, test these features:

- ✅ 3D scene loads and is interactive
- ✅ Navigation bar scrolls to sections
- ✅ Contact form submits successfully
- ✅ Spuff chatbot works (requires OpenAI API key)
- ✅ All project links work
- ✅ Resume PDF downloads
- ✅ Mobile responsive design

---

## Continuous Deployment

Once connected, every time you push to GitHub:

```bash
git add .
git commit -m "Update portfolio"
git push
```

Vercel/Netlify will automatically:
- Build your updated site
- Run tests
- Deploy to production
- No downtime!

---

## Troubleshooting

### Build fails on Vercel/Netlify

1. **Check build logs** in the deployment dashboard
2. **Common issues:**
   - Missing environment variables
   - Type errors (run `npm run build` locally first)
   - Missing dependencies

### 3D scene doesn't load

- Check browser console for errors
- Ensure WebGL is supported
- Try different browser

### Chatbot not working

- Verify `OPENAI_API_KEY` is set in environment variables
- Check API key is valid and has credits
- View function logs in Vercel dashboard

---

## Performance Optimization (Optional)

Your site is already optimized, but for even better performance:

1. **Enable Vercel Analytics:**
   - Dashboard → Analytics → Enable
   - Free tier: 100k events/month

2. **Add Vercel Speed Insights:**
   ```bash
   npm install @vercel/speed-insights
   ```
   
   Then in `page.tsx`:
   ```typescript
   import { SpeedInsights } from "@vercel/speed-insights/next"
   
   // Add at the end of your component
   <SpeedInsights />
   ```

3. **Monitor with Lighthouse:**
   - Open DevTools → Lighthouse
   - Run audit
   - Your portfolio should score 90+ on all metrics!

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**Your portfolio is production-ready! 🎉**

Choose Vercel for the best Next.js experience and deploy in 5 minutes.
