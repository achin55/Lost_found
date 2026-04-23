# Lost & Found Item Management System

A full-stack MERN application for managing lost and found items on a college campus.

## Features

- **User Authentication**
  - Secure user registration with bcrypt password hashing
  - JWT-based login and session management
  - Protected routes for authenticated users

- **Item Management**
  - Report lost items with details
  - Report found items with location
  - View all items in the system
  - Search items by name or category
  - Update or delete your own items
  - Filter by item type (Lost/Found) and status

- **User Interface**
  - Responsive and intuitive design
  - Real-time search functionality
  - Item categorization
  - Status tracking (Active, Resolved, Closed)

## Technology Stack

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React.js** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - CSS framework
- **CSS3** - Custom styling

## Project Structure

```
lost-found-mse2/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Item.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── itemController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── itemRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Register.js
    │   │   ├── Login.js
    │   │   ├── Dashboard.js
    │   │   ├── ItemForm.js
    │   │   ├── ItemList.js
    │   │   └── PrivateRoute.js
    │   ├── pages/
    │   ├── styles/
    │   │   ├── Auth.css
    │   │   ├── Dashboard.css
    │   │   ├── ItemForm.css
    │   │   └── ItemList.css
    │   ├── utils/
    │   │   ├── api.js
    │   │   └── auth.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    ├── .env
    ├── .gitignore
    └── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with MongoDB connection string:
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Start the server:
```bash
npm start
```

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the React app:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Items
- `POST /api/items` - Create item (Protected)
- `GET /api/items` - Get all items
- `GET /api/items/my-items` - Get user's items (Protected)
- `GET /api/items/:id` - Get item by ID
- `GET /api/items/search?name=xyz` - Search items
- `PUT /api/items/:id` - Update item (Protected)
- `DELETE /api/items/:id` - Delete item (Protected)

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date
}
```

### Item Model
```javascript
{
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

## Usage

1. Register a new account or login
2. After successful login, you'll be redirected to the dashboard
3. Report lost/found items using the form
4. View all items or search for specific items
5. Manage your items (edit/delete)
6. Logout when done

## Security Features

- Password hashing with bcryptjs (salt rounds: 10)
- JWT token-based authentication
- Protected routes requiring authentication
- CORS configuration for cross-origin requests
- Input validation and error handling

## Contributing

Feel free to submit issues and enhancement requests.

## License

This project is licensed under the ISC License.
