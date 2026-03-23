---
description: Deploy ResFotoPrompts to production hosting
---

# Workflow: Deploy ResFotoPrompts

## Overview
Deploy the ResFotoPrompts static site to production hosting (Netlify/Vercel/Cloudflare Pages).

## Prerequisites
- Node.js 18+ installed
- Git repository initialized
- Hosting account configured (Netlify/Vercel/Cloudflare)

## Steps

### 1. Pre-deploy Checks
// turbo
```bash
# Verify build scripts work
npm install
npm run build
```

### 2. Test Locally
```bash
# Start local server and verify functionality
npm run dev
# Open http://localhost:3000 and test:
# - All icons display correctly
# - Prompt generation works
# - Copy/download buttons work
# - Theme switching works
# - Language switching works
```

### 3. Build for Production
```bash
# Clean previous builds
rm -rf dist/

# Run production build
npm run build

# Verify dist/ folder contains:
# - index.html
# - css/main.min.css
# - js/main.min.js
# - All assets (img/, manifest.json, robots.txt, sitemap.xml)
```

### 4. Deploy to Hosting

#### Option A: Netlify
```bash
# Install Netlify CLI if not present
npm install -g netlify-cli

# Deploy to production
netlify deploy --prod --dir=.
```

#### Option B: Vercel
```bash
# Install Vercel CLI if not present
npm install -g vercel

# Deploy to production
vercel --prod
```

#### Option C: Cloudflare Pages
```bash
# Use Wrangler CLI
npm install -g wrangler

# Deploy
wrangler pages deploy . --project-name=resfotoproms
```

### 5. Post-deploy Verification
// turbo
```bash
# Verify site is live
curl -I https://resfotoproms.com

# Check all security headers
curl -I https://resfotoproms.com | grep -E "(content-security-policy|x-frame-options|x-content-type-options)"
```

### 6. Update Search Console
- Submit sitemap to Google Search Console: `https://resfotoproms.com/sitemap.xml`
- Verify robots.txt is accessible: `https://resfotoproms.com/robots.txt`
- Check for indexing errors

## Rollback Plan
If issues detected:
1. Revert to previous deployment via hosting dashboard
2. Or deploy previous git commit: `git revert HEAD && git push`

## Checklist
- [ ] All icons display correctly
- [ ] No console errors
- [ ] CSP headers working
- [ ] SSL certificate valid
- [ ] Mobile responsive
- [ ] PWA manifest working
- [ ] Sitemap submitted to Search Console
