import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemAPI } from '../utils/api';
import { getUser, logout } from '../utils/auth';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [items, setItems] = useState([]);
  const [userItems, setUserItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchAllItems();
  }, []);

  const fetchAllItems = async () => {
    setLoading(true);
    try {
      const response = await itemAPI.getAllItems();
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserItems = async () => {
    setLoading(true);
    try {
      const response = await itemAPI.getUserItems();
      setUserItems(response.data.items);
    } catch (error) {
      console.error('Error fetching user items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await itemAPI.searchItems({
        name: searchQuery,
        category: categoryFilter
      });
      setSearchResults(response.data.items);
    } catch (error) {
      console.error('Error searching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = (newItem) => {
    setItems([newItem, ...items]);
    setShowForm(false);
  };

  const handleUpdateItem = (updatedItem) => {
    setItems(items.map(item => item._id === updatedItem._id ? updatedItem : item));
    setUserItems(userItems.map(item => item._id === updatedItem._id ? updatedItem : item));
    setEditingItem(null);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemAPI.deleteItem(itemId);
        setItems(items.filter(item => item._id !== itemId));
        setUserItems(userItems.filter(item => item._id !== itemId));
        alert('Item deleted successfully');
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting item');
      }
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  const displayItems = () => {
    switch (activeTab) {
      case 'all':
        return items;
      case 'my-items':
        return userItems.length > 0 ? userItems : [];
      case 'search':
        return searchResults;
      default:
        return items;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">📦 Lost & Found System</span>
          <div className="navbar-text">
            <span className="me-3">Welcome, {user?.name}!</span>
            <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid dashboard-content">
        {/* Search Bar */}
        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search items by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="form-control category-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Documents">Documents</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
            <button type="submit" className="btn btn-primary search-btn">
              Search
            </button>
          </form>
        </div>

        {/* Tabs */}
        <div className="tabs-section">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => {
                setActiveTab('all');
                fetchAllItems();
              }}
            >
              All Items
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'my-items' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => {
                setActiveTab('my-items');
                fetchUserItems();
              }}
            >
              My Items
            </button>
            <button
              type="button"
              className={`btn ${activeTab === 'search' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setActiveTab('search')}
            >
              Search Results
            </button>
          </div>
          
          <button
            className="btn btn-success"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : '+ Report Item'}
          </button>
        </div>

        {/* Add/Edit Item Form */}
        {showForm && (
          <ItemForm
            onItemAdded={handleAddItem}
            onCancel={() => setShowForm(false)}
          />
        )}

        {editingItem && (
          <ItemForm
            item={editingItem}
            onItemUpdated={handleUpdateItem}
            onCancel={() => setEditingItem(null)}
          />
        )}

        {/* Items List */}
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <ItemList
            items={displayItems()}
            onDelete={handleDeleteItem}
            onEdit={setEditingItem}
            currentUserId={user?.id}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
