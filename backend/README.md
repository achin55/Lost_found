# Backend - Lost & Found Item Management System

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the backend directory:
```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key_change_this_in_production
NODE_ENV=development
```

### 3. Run the Server
**Development with auto-reload:**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## API Documentation

### Health Check
- **GET** `/api/health` - Server status

### Authentication Endpoints
- **POST** `/api/auth/register`
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Response: `{ token, user }`

- **POST** `/api/auth/login`
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
  Response: `{ token, user }`

### Item Endpoints

- **POST** `/api/items` (Protected)
  ```json
  {
    "title": "Blue Backpack",
    "description": "Large blue backpack with laptop compartment",
    "category": "Accessories",
    "type": "Lost",
    "location": "Library Building",
    "date": "2024-04-23",
    "contactInfo": "john@example.com",
    "status": "Active"
  }
  ```

- **GET** `/api/items` - Get all items

- **GET** `/api/items/my-items` (Protected) - Get user's items

- **GET** `/api/items/:id` - Get item by ID

- **GET** `/api/items/search?name=xyz&category=Electronics` - Search items

- **PUT** `/api/items/:id` (Protected) - Update item

- **DELETE** `/api/items/:id` (Protected) - Delete item

## Error Handling

Common error responses:

- `400 Bad Request` - Missing or invalid fields
- `401 Unauthorized` - Invalid token or not authenticated
- `403 Forbidden` - Not authorized to access resource
- `404 Not Found` - Resource not found
- `500 Server Error` - Internal server error

## Database Collections

### Users
- Stores user registration and login information
- Passwords are hashed using bcryptjs

### Items
- Stores all lost and found items
- Linked to users via userId
- Supports multiple categories and statuses

## Development Notes

- Use nodemon for development: `npm run dev`
- Check MongoDB connection in logs
- JWT tokens expire in 7 days
- All protected routes require Bearer token in Authorization header
