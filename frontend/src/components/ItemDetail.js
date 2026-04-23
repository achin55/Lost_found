import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { itemAPI } from '../utils/api';
import { getUser } from '../utils/auth';
import ItemForm from './ItemForm';
import '../styles/ItemDetail.css';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getUser();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchItemDetails();
  }, [id]);

  const fetchItemDetails = async () => {
    try {
      setLoading(true);
      const response = await itemAPI.getItemById(id);
      setItem(response.data.item);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error loading item details');
      console.error('Error fetching item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = (updatedItem) => {
    setItem(updatedItem);
    setEditingItem(null);
    alert('Item updated successfully');
  };

  const handleDeleteItem = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemAPI.deleteItem(id);
        alert('Item deleted successfully');
        navigate('/dashboard');
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting item');
      }
    }
  };

  const isOwner = user?.id === item?.userId?._id;

  if (loading) {
    return (
      <div className="detail-container">
        <div className="text-center mt-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-container">
        <div className="alert alert-danger mt-5" role="alert">
          {error}
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary mt-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="detail-container">
        <div className="alert alert-warning mt-5" role="alert">
          Item not found
        </div>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary mt-3">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-header">
        <button onClick={() => navigate('/dashboard')} className="btn btn-outline-secondary btn-back">
          ← Back to Dashboard
        </button>
        <h1 className="detail-title">{item.title}</h1>
        <span className={`badge ${item.type === 'Lost' ? 'bg-danger' : 'bg-success'}`}>
          {item.type}
        </span>
      </div>

      {editingItem && (
        <div className="edit-form-container">
          <ItemForm
            item={editingItem}
            onItemUpdated={handleUpdateItem}
            onCancel={() => setEditingItem(null)}
          />
        </div>
      )}

      {!editingItem && (
        <div className="detail-content">
          <div className="row">
            <div className="col-md-8">
              <div className="detail-card">
                <h2>Item Information</h2>
                
                <div className="detail-section">
                  <label>Category</label>
                  <p>{item.category}</p>
                </div>

                <div className="detail-section">
                  <label>Description</label>
                  <p>{item.description}</p>
                </div>

                <div className="detail-section">
                  <label>Location</label>
                  <p>📍 {item.location}</p>
                </div>

                <div className="detail-section">
                  <label>Date</label>
                  <p>📅 {new Date(item.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>

                <div className="detail-section">
                  <label>Status</label>
                  <p>
                    <span className={`status-badge ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="detail-card contact-card">
                <h3>Contact Information</h3>

                <div className="contact-section">
                  <label>Posted By</label>
                  <p>👤 {item.userId?.name || 'Unknown'}</p>
                </div>

                <div className="contact-section">
                  <label>Contact Info</label>
                  <p>📞 {item.contactInfo || 'Not provided'}</p>
                </div>

                {item.userId?.email && (
                  <div className="contact-section">
                    <label>Email</label>
                    <p>✉️ <a href={`mailto:${item.userId.email}`}>{item.userId.email}</a></p>
                  </div>
                )}

                <div className="contact-section">
                  <label>Posted On</label>
                  <p>🕐 {new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {isOwner && (
                <div className="detail-card actions-card">
                  <h3>Actions</h3>
                  <button
                    className="btn btn-warning btn-block mb-2"
                    onClick={() => setEditingItem(item)}
                  >
                    ✏️ Edit Item
                  </button>
                  <button
                    className="btn btn-danger btn-block"
                    onClick={handleDeleteItem}
                  >
                    🗑️ Delete Item
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetail;
