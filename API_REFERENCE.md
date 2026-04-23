# API Reference - Lost & Found System

## Base URL
- Local: `http://localhost:5000/api`
- Production: `https://lost-found-backend-xxx.onrender.com/api`

## Authentication

All protected endpoints require Bearer token in Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

## Endpoints

### 1. Health Check
**GET** `/health`
- **Description**: Check if server is running
- **Auth**: Not required
- **Response**:
```json
{
  "message": "Server is running"
}
```

---

### 2. User Registration
**POST** `/auth/register`
- **Description**: Create a new user account
- **Auth**: Not required
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
- **Error** (400):
```json
{
  "message": "Email already registered"
}
```

---

### 3. User Login
**POST** `/auth/login`
- **Description**: Login with email and password
- **Auth**: Not required
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response** (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
- **Error** (400):
```json
{
  "message": "Invalid email or password"
}
```

---

### 4. Create Item
**POST** `/items`
- **Description**: Report a lost or found item
- **Auth**: Required (Protected)
- **Body**:
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
- **Response** (201):
```json
{
  "message": "Item created successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Blue Backpack",
    "description": "Large blue backpack with laptop compartment",
    "category": "Accessories",
    "type": "Lost",
    "location": "Library Building",
    "date": "2024-04-23T00:00:00.000Z",
    "contactInfo": "john@example.com",
    "userId": "507f1f77bcf86cd799439011",
    "status": "Active",
    "createdAt": "2024-04-23T10:30:00.000Z",
    "updatedAt": "2024-04-23T10:30:00.000Z"
  }
}
```

---

### 5. Get All Items
**GET** `/items`
- **Description**: Retrieve all items in the system
- **Auth**: Not required
- **Query Parameters**: None
- **Response** (200):
```json
{
  "message": "Items retrieved successfully",
  "count": 10,
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Blue Backpack",
      "description": "Large blue backpack with laptop compartment",
      "category": "Accessories",
      "type": "Lost",
      "location": "Library Building",
      "date": "2024-04-23T00:00:00.000Z",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "status": "Active",
      "createdAt": "2024-04-23T10:30:00.000Z"
    }
  ]
}
```

---

### 6. Get User Items
**GET** `/items/my-items`
- **Description**: Get all items posted by logged-in user
- **Auth**: Required (Protected)
- **Response** (200):
```json
{
  "message": "User items retrieved successfully",
  "count": 3,
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Blue Backpack",
      ...
    }
  ]
}
```

---

### 7. Get Item by ID
**GET** `/items/:id`
- **Description**: Retrieve specific item details
- **Auth**: Not required
- **Parameters**: 
  - `id` (string) - Item MongoDB ID
- **Response** (200):
```json
{
  "message": "Item retrieved successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Blue Backpack",
    ...
  }
}
```
- **Error** (404):
```json
{
  "message": "Item not found"
}
```

---

### 8. Search Items
**GET** `/items/search`
- **Description**: Search items by name or category
- **Auth**: Not required
- **Query Parameters**:
  - `name` (string, optional) - Search term for title/description
  - `category` (string, optional) - Filter by category
  - `type` (string, optional) - Filter by type (Lost/Found)
- **Examples**:
```
GET /items/search?name=backpack
GET /items/search?category=Electronics
GET /items/search?name=backpack&category=Accessories&type=Lost
```
- **Response** (200):
```json
{
  "message": "Search completed",
  "count": 5,
  "items": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Blue Backpack",
      ...
    }
  ]
}
```

---

### 9. Update Item
**PUT** `/items/:id`
- **Description**: Update item details (owner only)
- **Auth**: Required (Protected)
- **Parameters**:
  - `id` (string) - Item MongoDB ID
- **Body** (send only fields to update):
```json
{
  "status": "Resolved",
  "title": "Blue Backpack Updated",
  "description": "Updated description"
}
```
- **Response** (200):
```json
{
  "message": "Item updated successfully",
  "item": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Blue Backpack Updated",
    "status": "Resolved",
    ...
  }
}
```
- **Error** (403):
```json
{
  "message": "Not authorized to update this item"
}
```

---

### 10. Delete Item
**DELETE** `/items/:id`
- **Description**: Delete item (owner only)
- **Auth**: Required (Protected)
- **Parameters**:
  - `id` (string) - Item MongoDB ID
- **Response** (200):
```json
{
  "message": "Item deleted successfully"
}
```
- **Error** (403):
```json
{
  "message": "Not authorized to delete this item"
}
```
- **Error** (404):
```json
{
  "message": "Item not found"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Success |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Not authorized |
| 404 | Not Found - Resource not found |
| 500 | Server Error |

---

## Item Categories

- Electronics
- Clothing
- Accessories
- Documents
- Sports
- Books
- Other

---

## Item Types

- Lost
- Found

---

## Item Status

- Active
- Resolved
- Closed

---

## Examples Using cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Create Item
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "title": "Blue Backpack",
    "description": "Lost blue backpack near library",
    "category": "Accessories",
    "type": "Lost",
    "location": "Library Building",
    "date": "2024-04-23",
    "contactInfo": "john@example.com"
  }'
```

### Get All Items
```bash
curl http://localhost:5000/api/items
```

### Search Items
```bash
curl "http://localhost:5000/api/items/search?name=backpack&category=Accessories"
```

### Update Item
```bash
TOKEN="your_jwt_token_here"
ITEM_ID="item_id_here"

curl -X PUT http://localhost:5000/api/items/$ITEM_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "status": "Resolved"
  }'
```

### Delete Item
```bash
TOKEN="your_jwt_token_here"
ITEM_ID="item_id_here"

curl -X DELETE http://localhost:5000/api/items/$ITEM_ID \
  -H "Authorization: Bearer $TOKEN"
```

---

## Rate Limiting

Currently no rate limiting is implemented. 
Consider adding in production for security.

---

## Version History

- v1.0.0 - Initial release (April 2024)
