# Testing Guide - Lost & Found System

## Local Testing

### Prerequisites
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- MongoDB connection active

### API Testing Using REST Client/Postman

#### 1. Health Check
```
GET http://localhost:5000/api/health
```
Expected: `{ "message": "Server is running" }`

#### 2. User Registration
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
Expected Response:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "....",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### 3. User Login
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
Expected: Same as registration response

#### 4. Create Item (Protected)
```
POST http://localhost:5000/api/items
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Blue Backpack",
  "description": "Large blue backpack with laptop compartment",
  "category": "Accessories",
  "type": "Lost",
  "location": "Library Building",
  "date": "2024-04-23",
  "contactInfo": "john@example.com"
}
```

#### 5. Get All Items
```
GET http://localhost:5000/api/items
```

#### 6. Get User Items (Protected)
```
GET http://localhost:5000/api/items/my-items
Authorization: Bearer <JWT_TOKEN>
```

#### 7. Search Items
```
GET http://localhost:5000/api/items/search?name=backpack&category=Accessories
```

#### 8. Get Item by ID
```
GET http://localhost:5000/api/items/<ITEM_ID>
```

#### 9. Update Item (Protected)
```
PUT http://localhost:5000/api/items/<ITEM_ID>
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "status": "Resolved",
  "title": "Blue Backpack Updated"
}
```

#### 10. Delete Item (Protected)
```
DELETE http://localhost:5000/api/items/<ITEM_ID>
Authorization: Bearer <JWT_TOKEN>
```

### Frontend Testing

#### Test User Flows

1. **Registration Flow**
   - Navigate to `/register`
   - Fill in form with valid data
   - Submit
   - Should redirect to dashboard

2. **Login Flow**
   - Navigate to `/login`
   - Enter credentials
   - Click login
   - Should redirect to dashboard

3. **Dashboard Features**
   - View all items (All Items tab)
   - Search items (Search tab)
   - View user's items (My Items tab)
   - Add new item
   - Edit own item
   - Delete own item
   - Logout

4. **Search Functionality**
   - Search by item name
   - Filter by category
   - Filter by type (Lost/Found)
   - Results display correctly

5. **Item Management**
   - Create item with all fields
   - Update item status
   - Delete item with confirmation
   - Verify changes in list

### Error Testing

1. **Authentication Errors**
   - Login with wrong password → Error message
   - Register with existing email → Error message
   - Access protected route without token → Redirect to login

2. **Validation Errors**
   - Submit empty form → Error message
   - Enter invalid email → Error message
   - Invalid date → Error message

3. **Authorization Errors**
   - Try to edit/delete others' items → Error message
   - Try to delete non-existent item → Error message

### Database Testing

#### Check MongoDB Data

1. **Users Collection**
   - Verify passwords are hashed (not plain text)
   - Check email uniqueness
   - Verify user creation timestamps

2. **Items Collection**
   - Verify items are linked to users
   - Check all required fields present
   - Verify timestamps updated correctly

### Performance Testing

1. **Load Testing**
   - Add 100+ items to database
   - Test search performance
   - Test list loading speed

2. **Response Times**
   - Measure API response times
   - Check database query optimization
   - Monitor network requests

### Browser Compatibility

- Test on Chrome
- Test on Firefox
- Test on Safari
- Test on Edge

### Responsive Design Testing

- Mobile (320px)
- Tablet (768px)
- Desktop (1024px+)

### Test Data

```javascript
// Sample Users
{
  "users": [
    {"name": "Alice", "email": "alice@test.com", "password": "password123"},
    {"name": "Bob", "email": "bob@test.com", "password": "password123"}
  ]
}

// Sample Items
{
  "items": [
    {
      "title": "Blue Backpack",
      "description": "Lost blue backpack near library",
      "category": "Accessories",
      "type": "Lost",
      "location": "Library",
      "date": "2024-04-23",
      "contactInfo": "alice@test.com"
    },
    {
      "title": "iPhone 13",
      "description": "Found iPhone 13 in black case",
      "category": "Electronics",
      "type": "Found",
      "location": "Cafeteria",
      "date": "2024-04-22",
      "contactInfo": "bob@test.com"
    }
  ]
}
```

## Manual Testing Checklist

- [ ] Registration successful with valid data
- [ ] Registration fails with duplicate email
- [ ] Login successful with correct credentials
- [ ] Login fails with incorrect credentials
- [ ] JWT token stored in localStorage
- [ ] Token sent with protected API requests
- [ ] Protected routes require authentication
- [ ] Create item works for logged-in user
- [ ] Create item fails without authentication
- [ ] All items displayed correctly
- [ ] Search filters work correctly
- [ ] User items display only user's items
- [ ] Edit own item succeeds
- [ ] Edit other's item fails
- [ ] Delete own item succeeds
- [ ] Delete other's item fails
- [ ] Logout clears token
- [ ] Redirects to login after logout
- [ ] Responsive design works on mobile
- [ ] Responsive design works on tablet
- [ ] Form validation messages display
- [ ] Error messages display correctly
- [ ] Loading states show properly
- [ ] Pagination works (if implemented)
- [ ] Date picker works correctly
- [ ] Category dropdown works
- [ ] Status updates correctly
- [ ] Contact info saves correctly

## Automated Testing (Future Enhancement)

```javascript
// Example Jest test
describe('Authentication', () => {
  test('User can register', async () => {
    const response = await api.post('/auth/register', {
      name: 'Test',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(response.status).toBe(201);
    expect(response.data.token).toBeDefined();
  });

  test('User cannot register with duplicate email', async () => {
    // Should return 400
  });
});
```

## Continuous Testing Strategy

1. **Unit Tests** - Test individual functions
2. **Integration Tests** - Test API endpoints
3. **E2E Tests** - Test complete user flows
4. **Performance Tests** - Monitor response times
5. **Security Tests** - Test authorization, validation
