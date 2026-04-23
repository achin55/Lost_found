# Lost & Found Item Management System - Complete Setup Guide

## 📋 Project Overview

A full-stack MERN application for managing lost and found items on a college campus with:
- User authentication (JWT + bcrypt)
- Item reporting (Lost/Found)
- Search and filtering capabilities
- CRUD operations
- Responsive UI design
- MongoDB integration

## 🚀 Quick Start

### 1. Clone Repository
```bash
cd c:\Users\achin\Lost_found_mse2
```

### 2. Install All Dependencies
```bash
npm run install-all
```

Or manually:
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### 3. Configure Environment Variables

**Backend (.env)**
```
PORT=5000
MONGO_URL=mongodb://Achin:admin@ac-gkxo5tk-shard-00-00.nooj3hz.mongodb.net:27017,ac-gkxo5tk-shard-00-01.nooj3hz.mongodb.net:27017,ac-gkxo5tk-shard-00-02.nooj3hz.mongodb.net:27017/?ssl=true&replicaSet=atlas-12738f-shard-0&authSource=admin&appName=Cluster5
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Run Application

**Option A: Separate Terminals**
```bash
# Terminal 1 - Backend
cd backend && npm start

# Terminal 2 - Frontend
cd frontend && npm start
```

**Option B: Concurrent (requires concurrently package)**
```bash
npm run dev
```

### 5. Access Application
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 📁 Project Structure

```
lost-found-mse2/
├── backend/
│   ├── models/
│   │   ├── User.js          (User schema with bcrypt hashing)
│   │   └── Item.js          (Item schema with categories)
│   ├── controllers/
│   │   ├── authController.js (Register/Login logic)
│   │   └── itemController.js (CRUD operations)
│   ├── routes/
│   │   ├── authRoutes.js    (Auth endpoints)
│   │   └── itemRoutes.js    (Item endpoints)
│   ├── middleware/
│   │   └── auth.js          (JWT verification)
│   ├── server.js            (Express setup)
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.js      (Registration form)
│   │   │   ├── Login.js         (Login form)
│   │   │   ├── Dashboard.js     (Main dashboard)
│   │   │   ├── ItemForm.js      (Add/Edit items)
│   │   │   ├── ItemList.js      (Display items)
│   │   │   └── PrivateRoute.js  (Route protection)
│   │   ├── styles/
│   │   │   ├── Auth.css
│   │   │   ├── Dashboard.css
│   │   │   ├── ItemForm.css
│   │   │   └── ItemList.css
│   │   ├── utils/
│   │   │   ├── api.js          (Axios setup & API calls)
│   │   │   └── auth.js         (Auth helpers)
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   ├── .env
│   └── README.md
│
├── README.md
├── DEPLOYMENT.md
├── TESTING.md
├── package.json
└── .gitignore
```

## 🔑 Key Features

### Authentication
- **Register**: Create account with email validation
- **Login**: Secure JWT-based login
- **Protected Routes**: Dashboard accessible only to logged-in users
- **Token Storage**: JWT stored in localStorage
- **Logout**: Clear session and redirect

### Item Management
- **Report Items**: Submit lost/found items with details
- **Categories**: Electronics, Clothing, Accessories, Documents, Sports, Books, Other
- **Search**: Find items by name or category
- **Filter**: Filter by item type (Lost/Found) and status
- **Edit**: Update own items (title, description, status, etc.)
- **Delete**: Remove own items with confirmation
- **Status Tracking**: Active, Resolved, Closed

### Security Features
- **Password Hashing**: bcryptjs with 10 salt rounds
- **JWT Authentication**: Secure token-based auth
- **Authorization**: Only owners can edit/delete items
- **CORS**: Configured for cross-origin requests
- **Input Validation**: Server-side validation
- **Error Handling**: Comprehensive error messages

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/register      - Register new user
POST /api/auth/login         - Login user
```

### Items (GET endpoints are public)
```
POST   /api/items                    - Create item (Protected)
GET    /api/items                    - Get all items
GET    /api/items/my-items          - Get user's items (Protected)
GET    /api/items/:id               - Get item by ID
GET    /api/items/search?name=xyz   - Search items
PUT    /api/items/:id               - Update item (Protected)
DELETE /api/items/:id               - Delete item (Protected)
```

## 🗄️ Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Item Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  type: String (Lost/Found),
  location: String,
  date: Date,
  image: String,
  userId: ObjectId (ref: User),
  status: String (Active/Resolved/Closed),
  contactInfo: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🛠️ Technology Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin support
- **dotenv** - Environment variables

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **CSS3** - Custom styling

## 🧪 Testing Endpoints

### 1. Test Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 4. Create Item (Replace TOKEN with actual JWT)
```bash
curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "title": "Blue Backpack",
    "description": "Lost blue backpack near library",
    "category": "Accessories",
    "type": "Lost",
    "location": "Library",
    "date": "2024-04-23",
    "contactInfo": "john@example.com"
  }'
```

### 5. Get All Items
```bash
curl http://localhost:5000/api/items
```

### 6. Search Items
```bash
curl "http://localhost:5000/api/items/search?name=backpack&category=Accessories"
```

## 📊 User Flow Diagram

```
Register/Login → Dashboard → View Items → Search → Add/Edit/Delete Items → Logout
```

## ✅ Deployment Checklist

- [ ] Backend deployed on Render
- [ ] Frontend deployed on Render
- [ ] GitHub repository created
- [ ] Environment variables configured
- [ ] MongoDB connection verified
- [ ] CORS settings updated for production
- [ ] All API endpoints tested
- [ ] Frontend-backend communication working
- [ ] HTTPS enforced
- [ ] Error monitoring setup

## 🐛 Troubleshooting

### Backend won't start
```
Error: Cannot find module 'express'
Solution: npm install in backend folder
```

### Frontend won't load
```
Error: CORS error
Solution: Check CORS in server.js and REACT_APP_API_URL in .env
```

### MongoDB connection fails
```
Error: MongooseError: Cannot connect
Solution: Verify MONGO_URL and internet connection to MongoDB Atlas
```

### Token expired
```
Error: Token is not valid
Solution: Login again to get new token
```

## 📝 Development Notes

- JWT tokens expire in 7 days
- Passwords are hashed with bcryptjs (10 salt rounds)
- All protected routes require valid JWT token
- Search is case-insensitive and partial match
- Only item owner can edit/delete items
- Timestamps are auto-generated

## 🚢 Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions on Render and GitHub.

## 🧪 Testing

See [TESTING.md](./TESTING.md) for comprehensive testing guide including:
- API endpoint testing
- Frontend feature testing
- Error handling testing
- Performance testing
- Responsive design testing

## 📞 Support

For issues or questions:
1. Check error logs in terminal
2. Check browser console (F12)
3. Review documentation
4. Check MongoDB Atlas data

## 📄 License

ISC License

## 👥 Contributors

Achin Singh

## 🎯 Course Information

**CO-3 Requirement**: All parts of the MERN stack implementation with:
- Frontend authentication and dashboard
- Backend API with protected routes
- JWT and bcrypt implementation
- MongoDB integration
- CRUD operations
- Deployment on GitHub and Render
