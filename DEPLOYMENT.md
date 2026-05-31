# Virtual Try-On: Deployment Guide


## Deployment Instructions

### Option 1: Deploy to Netlify (Recommended)
```bash
# 1. Build the project
npm run build

# 2. Deploy using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

The `_redirects` file automatically handles all client-side routing.

### Option 2: Deploy to Vercel
```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Deploy
vercel --prod
```

### Option 3: Deploy to GitHub Pages
1. Update `vite.config.js` with base path (if not root domain)
2. Build: `npm run build`
3. Deploy `dist` folder

### Option 4: Self-Hosted (Apache/Nginx)
**Apache (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Nginx:**
```nginx
try_files $uri /index.html;
```

## Pre-Deployment Checklist

✅ Routes configuration fixed (`/result` → `/try-on`)
✅ SPA routing configured in Vite
✅ Fallback route added (unmapped → landing page)
✅ Netlify redirects file added
✅ Landing page is default entry point
✅ Protected routes still require authentication

## Environment Variables
Before deployment, ensure you have:
- Firebase configuration in `src/utils/firebase.js`
- All environment-specific settings configured

## Build Output
```bash
npm run build
# Creates optimized dist/ folder ready for deployment
```

## Testing Before Deployment
```bash
# Build and test locally
npm run build
npm run preview

# Visit http://localhost:4173 to test the build
# Try navigating to various routes including invalid ones
```

All routes should work correctly and invalid routes should redirect to landing page.
