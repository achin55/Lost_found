# Deployment Guide - Lost & Found System

## GitHub Deployment

### 1. Initialize Git Repository

```bash
cd lost-found-mse2
git init
git add .
git commit -m "Initial commit: MERN stack Lost & Found System"
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New Repository"
3. Name: `lost-found-mse2`
4. Choose Public (for demonstration)
5. Click "Create repository"

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/lost-found-mse2.git
git branch -M main
git push -u origin main
```

## Render Deployment

### Backend Deployment on Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Dashboard → New Web Service
   - Connect GitHub Repository
   - Select `lost-found-mse2` repository
   - Choose `Main` branch

3. **Configure Backend Service**
   - **Name:** `lost-found-backend`
   - **Runtime:** Node
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
   - **Environment Variables:**
     ```
     PORT=5000
     NODE_ENV=production
     MONGO_URL=your_mongodb_connection_string
     JWT_SECRET=your_production_jwt_secret
     ```

4. **Deploy**
   - Click Deploy
   - Wait for deployment to complete
   - Note the URL: `https://lost-found-backend-xxx.onrender.com`

### Frontend Deployment on Render

1. **Create Static Site**
   - Dashboard → New Static Site
   - Connect GitHub Repository

2. **Configure Frontend**
   - **Name:** `lost-found-frontend`
   - **Build Command:** `cd frontend && npm run build`
   - **Publish Directory:** `frontend/build`
   - **Environment Variables:**
     ```
     REACT_APP_API_URL=https://lost-found-backend-xxx.onrender.com/api
     ```

3. **Deploy**
   - Click Deploy
   - Frontend URL: `https://lost-found-frontend-xxx.onrender.com`

## Deployment Links

After successful deployment, update these links:

- **Frontend URL:** `https://lost-found-frontend-xxx.onrender.com`
- **Backend API:** `https://lost-found-backend-xxx.onrender.com/api`
- **GitHub Repository:** `https://github.com/YOUR_USERNAME/lost-found-mse2`

## Testing Deployed Application

### 1. Test Registration Endpoint
```
POST https://lost-found-backend-xxx.onrender.com/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "testpass123"
}
```

### 2. Test Login Endpoint
```
POST https://lost-found-backend-xxx.onrender.com/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "testpass123"
}
```

### 3. Test Item Creation
```
POST https://lost-found-backend-xxx.onrender.com/api/items
Authorization: Bearer <token_from_login>
Content-Type: application/json

{
  "title": "Lost Backpack",
  "description": "Blue backpack with laptop",
  "category": "Accessories",
  "type": "Lost",
  "location": "Library",
  "date": "2024-04-23",
  "contactInfo": "test@example.com"
}
```

### 4. Test Get All Items
```
GET https://lost-found-backend-xxx.onrender.com/api/items
```

### 5. Access Frontend
- Open: `https://lost-found-frontend-xxx.onrender.com`
- Register a new account
- Test all features

## Environment Setup Summary

### Backend (.env)
```
PORT=5000
MONGO_URL=mongodb://Achin:admin@ac-gkxo5tk-shard-00-00.nooj3hz.mongodb.net:27017...
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

### Production (Render)
- Set environment variables in Render dashboard
- Ensure CORS is configured correctly
- MongoDB Atlas allows Render IP addresses

## Troubleshooting Deployment

### Issue: Build Failed
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Node version compatibility

### Issue: Connection Error
- Verify MongoDB connection string
- Check environment variables are set correctly
- Ensure CORS is enabled on backend

### Issue: Frontend Can't Reach Backend
- Update REACT_APP_API_URL in frontend environment
- Check CORS configuration in server.js
- Verify backend URL is correct

## Post-Deployment Checklist

- [ ] GitHub repository created and linked
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] Environment variables configured
- [ ] MongoDB connection verified
- [ ] JWT tokens working correctly
- [ ] CORS configured properly
- [ ] All API endpoints tested
- [ ] Frontend-backend communication working
- [ ] User authentication flow tested
- [ ] Item CRUD operations verified
- [ ] Search functionality working
- [ ] Logout functionality working
- [ ] Responsive design on mobile
- [ ] Error handling tested
