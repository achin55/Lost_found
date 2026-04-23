# Frontend - Lost & Found Item Management System

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:5000/api
```

### 3. Run the Application
```bash
npm start
```

The app will run on `http://localhost:3000`

## Project Structure

- **components/** - React components (Register, Login, Dashboard, etc.)
- **pages/** - Page components
- **styles/** - CSS files for styling
- **utils/** - Utility functions for API calls and authentication

## Features Implemented

### Authentication
- User registration with validation
- Secure login with JWT tokens
- Token storage in localStorage
- Protected routes

### Dashboard
- Display all items in a grid layout
- Search items by name or category
- Filter by item type (Lost/Found)
- View user's own items
- Add/edit/delete items

### Item Management
- Create new item reports
- Edit item details
- Delete items
- View item details
- Update item status

### User Interface
- Responsive design using Bootstrap 5
- Custom CSS styling
- Real-time form validation
- Loading states
- Error handling with alerts

## Key Components

### Register.js
- User registration form
- Email validation
- Password hashing on backend
- Error handling

### Login.js
- User login form
- JWT token storage
- Redirect to dashboard on success

### Dashboard.js
- Main dashboard interface
- Tab navigation (All items, My items, Search results)
- Search functionality
- Item display

### ItemForm.js
- Form for creating/editing items
- Category selection
- Status tracking
- Contact information

### ItemList.js
- Display items in grid layout
- Item card with details
- Edit/Delete buttons for user's items
- Responsive design

## API Integration

The frontend communicates with the backend through:
- **axios** - HTTP client
- **Interceptors** - Automatically attach JWT tokens to requests
- **Error handling** - Display appropriate error messages

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in all protected API requests
5. Protected routes check token validity
6. Logout clears token and redirects to login

## Running the Application

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

Visit `http://localhost:3000` in your browser.

## Development Notes

- Ensure backend is running before starting frontend
- Check browser console for any errors
- Network tab can show API requests
- Local storage is used for token persistence
- Refresh page maintains session if token is valid
