# Production Deployment Checklist

## ✅ FRONTEND (Render - lost-found-frontend-dne2)

### Build Settings
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run serve`
- **Node Version**: 18 (or latest)

### Environment Variables
```
REACT_APP_API_URL=https://lost-found-backend-dne2.onrender.com/api
REACT_APP_ENV=production
GENERATE_SOURCEMAP=false
```

### Key Changes Made
✅ Removed `proxy` field from package.json
✅ Added `serve` package for production
✅ Added `npm run serve` and `npm run start-prod` scripts
✅ Created `.env.production` with absolute backend URL
✅ Created `.env.development` for local development
✅ API client uses `process.env.REACT_APP_API_URL`

---

## ✅ BACKEND (Render - already deployed)

### Environment Variables (to update on Render)
```
PORT=5000
MONGO_URL=mongodb://...
JWT_SECRET=dcb7dab76e5c4dc3df6b7a56d7aed7db...
NODE_ENV=production
FRONTEND_URL=https://lost-found-frontend-dne2.onrender.com
```

### CORS Configuration
✅ Updated to accept frontend production URL
✅ Accepts credentials for secure communication
✅ Allows all necessary HTTP methods
✅ Validates origin headers

### Health Check Endpoint
✅ Enhanced `/api/health` with success message showing:
- Status: success
- Message: "✓ Backend API is running and ready!"
- Database connection status
- Available endpoints
- Timestamp

---

## 🔍 VERIFY DEPLOYMENT

### Test Checklist
- [ ] Visit frontend URL without "Invalid Host header" error
- [ ] Check Network tab shows successful requests to backend
- [ ] Login/Register works
- [ ] Create item works
- [ ] View items works
- [ ] Search functionality works
- [ ] Edit/Delete items work
- [ ] No CORS errors in console

### API Health Check
```bash
curl https://lost-found-backend-dne2.onrender.com/api/health
```

Expected response:
```json
{
  "status": "success",
  "message": "✓ Backend API is running and ready!",
  "environment": "production",
  "database": "MongoDB connected"
}
```

---

## 🚀 DEPLOYMENT STEPS

### 1. Update Backend on Render
- Go to Render Backend Service
- Update Environment Variables (add `FRONTEND_URL`)
- Trigger deployment
- Verify `/api/health` shows success

### 2. Install Frontend Dependencies Locally (for testing)
```bash
cd frontend
npm install
npm run build
```

### 3. Deploy Frontend on Render
- Delete old deployment or update existing
- Set Build Command: `npm install && npm run build`
- Set Start Command: `npm run serve`
- Add Environment Variables (see above)
- Deploy

### 4. Test Live URLs
```
Frontend: https://lost-found-frontend-dne2.onrender.com
Backend Health: https://lost-found-backend-dne2.onrender.com/api/health
```

---

## 📝 FILES CHANGED

### Frontend
- `package.json` - Added `serve`, removed `proxy`, updated scripts
- `.env` - Updated API URL to production
- `.env.production` - NEW - Production configuration
- `.env.development` - NEW - Development configuration
- `src/utils/api.js` - Already correct, uses env variable

### Backend
- `.env` - Added `FRONTEND_URL` for CORS
- `server.js` - Enhanced CORS and health check endpoint

---

## 🛡️ SECURITY BEST PRACTICES IMPLEMENTED

✅ **CORS**: Whitelist specific domains (not all origins)
✅ **Environment Variables**: Sensitive data in .env files
✅ **Production Build**: Optimized, minified code
✅ **No Proxy in Production**: Direct API calls with absolute URLs
✅ **JWT Authentication**: Bearer tokens for secure requests
✅ **HTTPS**: All URLs use https:// in production
✅ **Error Handling**: Proper error messages without exposing internals

---

## ❓ TROUBLESHOOTING

### Still getting "Invalid Host header"?
1. Clear browser cache (Cmd+Shift+Delete)
2. Check frontend service is using `serve` not `react-scripts start`
3. Verify `.env.production` has correct API URL
4. Check Render logs for actual error

### CORS errors in console?
1. Verify backend `.env` has `FRONTEND_URL` set correctly
2. Check backend CORS middleware is deployed
3. Restart backend service on Render
4. Test with: `curl -H "Origin: https://lost-found-frontend-dne2.onrender.com" https://lost-found-backend-dne2.onrender.com/api/health`

### API calls timing out?
1. Check backend is running: Visit `/api/health`
2. Check API URL in frontend `.env.production`
3. Check network latency and backend performance
4. Check Render logs for errors

---

## 📚 REFERENCES

- **serve package**: https://www.npmjs.com/package/serve
- **Create React App Production**: https://create-react-app.dev/docs/production-build/
- **Render Deployment**: https://render.com/docs/deploys

