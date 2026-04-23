# Render Frontend Deployment Guide

## Build Command
```
npm install && npm run build
```

## Start Command  
```
npm run serve
```

## Environment Variables (Frontend)
```
REACT_APP_API_URL=https://lost-found-backend-dne2.onrender.com/api
REACT_APP_ENV=production
GENERATE_SOURCEMAP=false
```

## Why This Works

### The Problem
- **Invalid Host header** occurs because React dev server has strict host validation
- `react-scripts start` rejects requests from different domains (https://lost-found-frontend-dne2.onrender.com)
- The `proxy` field only works locally, not in production

### The Solution
1. **Build the app**: `npm run build` creates an optimized production build
2. **Use serve**: `serve` is a lightweight Node.js static file server that:
   - Serves your built app without strict host validation
   - Properly handles SPA routing
   - Works in production environment
3. **Remove proxy**: Use absolute URLs with environment variables instead

## File Structure After Build
```
frontend/
├── build/              (Production-optimized code)
├── src/
├── package.json
└── .env.production     (Production environment variables)
```

## How Frontend Communicates with Backend
- Frontend calls: `https://lost-found-backend-dne2.onrender.com/api/...`
- Backend receives requests with proper CORS headers
- Backend responds with correct data

## Verification Steps
1. Visit frontend URL: https://lost-found-frontend-dne2.onrender.com
2. Check browser console for no CORS errors
3. Test login/register functionality
4. Test item creation/retrieval
