# 📧 Contact Form Email Setup

Your contact form now sends **real emails** to **rkkarumanchi98@gmail.com**!

---

## 🎯 How It Works Now

When someone fills out the "Get In Touch" form:
1. ✅ Their data (name, email, phone) is sent to `/api/contact`
2. ✅ The API sends you an email via **Resend**
3. ✅ You receive the email at **rkkarumanchi98@gmail.com**
4. ✅ User sees success message

**Before:** Form data was discarded (just simulated)
**Now:** You get an email with every submission!

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Get Resend API Key (FREE)

1. **Go to Resend:** https://resend.com/signup
2. **Sign up** with your GitHub account (or email)
3. **Verify your email** (check inbox)
4. **Create API Key:**
   - Go to https://resend.com/api-keys
   - Click **"Create API Key"**
   - Name: `Portfolio Contact Form`
   - Permission: **"Sending access"**
   - Click **"Create"**
5. **Copy the API key** (starts with `re_...`)

### Step 2: Add API Key to `.env.local`

Open `/Users/rohit/rohit-portfolio/.env.local` and replace:

```bash
RESEND_API_KEY=your_resend_api_key_here
```

With your actual key:

```bash
RESEND_API_KEY=re_YourActualKeyHere
```

### Step 3: Restart Dev Server

```bash
# Kill current server (Ctrl+C)
npm run dev
```

### Step 4: Test It!

1. Go to http://localhost:3001
2. Scroll to **"Get In Touch"**
3. Fill out the form with test data
4. Click **"Send Message"**
5. ✅ Check **rkkarumanchi98@gmail.com** for the email!

---

## 📧 What the Email Looks Like

**Subject:** New Portfolio Contact: [Name]

**Body:**
```
New Contact Form Submission

Name: John Doe
Email: john@example.com
Phone: +1 (555) 123-4567

────────────────────────────
Sent from your portfolio at rohitkarumanchi.com
```

---

## 🔧 Files Changed

### 1. **New API Route** - `/src/app/api/contact/route.ts`
- Handles form submissions
- Sends emails via Resend
- Validates input
- Returns success/error responses

### 2. **Updated Contact Form** - `/src/app/page.tsx`
- Calls `/api/contact` API
- Shows success/error messages
- Clears form on success
- Fallback: Shows email link if API fails

### 3. **New Dependency** - `package.json`
- Added `resend` package
- Installed via `npm install resend`

### 4. **Environment Variable** - `.env.local`
- Added `RESEND_API_KEY`
- Must be set for emails to work

---

## 🎨 Resend Free Tier

**What's Included:**
- ✅ **100 emails/day** (3,000/month)
- ✅ **Unlimited API requests**
- ✅ **Email analytics**
- ✅ **Delivery tracking**
- ✅ **No credit card required**

Perfect for a portfolio contact form!

---

## 🔐 Security Notes

### ✅ **Your Email is Protected:**
- Only YOU receive emails (hardcoded to `rkkarumanchi98@gmail.com`)
- API key is in `.env.local` (NOT committed to Git)
- `.gitignore` already excludes `.env.local`

### ✅ **Form Validation:**
- All fields are required
- Email format validated by browser
- Server-side validation in API route

### ✅ **Error Handling:**
- If Resend fails, user sees error message
- Fallback: Direct email link to `rkkarumanchi98@gmail.com`
- All errors logged to console

---

## 🚨 Troubleshooting

### **"Failed to send message" error**

**Cause:** Missing or invalid `RESEND_API_KEY`

**Fix:**
1. Check `.env.local` has the key
2. Verify key is correct (starts with `re_`)
3. Restart dev server: `npm run dev`

### **Email not arriving**

**Cause:** Resend using test email address

**Fix:**
1. In production, **verify your domain** with Resend
2. For now, emails come from `onboarding@resend.dev`
3. Check **spam folder**

### **"Internal server error"**

**Cause:** Resend API issue

**Fix:**
1. Check Resend dashboard: https://resend.com/emails
2. Verify API key permissions
3. Check console logs for errors

---

## 🌐 Production Deployment

### **On AWS Amplify:**

1. **Add environment variable:**
   - Amplify Console → Environment variables
   - Key: `RESEND_API_KEY`
   - Value: Your Resend API key
   - Click "Save"

2. **Redeploy:**
   - Push to GitHub
   - Amplify auto-deploys
   - Contact form now sends emails in production!

### **On AWS EC2:**

1. **Add to `.env.local` on server:**
   ```bash
   ssh -i your-key.pem ubuntu@YOUR_EC2_IP
   cd rohit-portfolio
   nano .env.local
   # Add RESEND_API_KEY=your_key_here
   # Save and exit (Ctrl+X, Y, Enter)
   ```

2. **Restart PM2:**
   ```bash
   pm2 restart portfolio
   ```

---

## 📊 Email Analytics

**View sent emails:**
1. Go to https://resend.com/emails
2. See all submissions
3. Track delivery status
4. View email content

**Metrics:**
- Total sent
- Delivery rate
- Bounce rate
- Click tracking (if enabled)

---

## 🎯 Alternative: Custom Domain Email

To send from `contact@rohitkarumanchi.com`:

1. **Add domain to Resend:**
   - https://resend.com/domains
   - Add `rohitkarumanchi.com`
   - Add DNS records (TXT, MX, CNAME)

2. **Update API route:**
   ```typescript
   from: 'Portfolio Contact <contact@rohitkarumanchi.com>',
   ```

3. **Benefits:**
   - More professional
   - Better deliverability
   - No "sent via Resend" label

---

## ✅ Testing Checklist

Before deploying to production:

- [ ] Resend API key added to `.env.local`
- [ ] Dev server restarted
- [ ] Test form submission works
- [ ] Email received at `rkkarumanchi98@gmail.com`
- [ ] Success message displays correctly
- [ ] Form clears after submission
- [ ] Error handling tested (invalid API key)
- [ ] Environment variable added to AWS

---

## 📝 Summary

**Status:** ✅ **Contact form now sends real emails!**

**Your Email:** rkkarumanchi98@gmail.com
**Service:** Resend (free tier)
**Limit:** 100 emails/day
**Setup Time:** 5 minutes

**Next Step:** Get your Resend API key and add it to `.env.local`!

---

**Questions?** Check the Resend docs: https://resend.com/docs
