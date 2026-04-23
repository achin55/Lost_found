import React, { useState, useEffect } from 'react';
import { itemAPI } from '../utils/api';
import '../styles/ItemForm.css';

const ItemForm = ({ item, onItemAdded, onItemUpdated, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics',
    type: 'Lost',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contactInfo: '',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setFormData({
        ...item,
        date: item.date.split('T')[0]
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.title || !formData.description || !formData.location) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      if (item) {
        const response = await itemAPI.updateItem(item._id, formData);
        onItemUpdated(response.data.item);
        alert('Item updated successfully');
      } else {
        const response = await itemAPI.createItem(formData);
        onItemAdded(response.data.item);
        alert('Item reported successfully');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="item-form-container">
      <h3>{item ? 'Edit Item' : 'Report Item'}</h3>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Item Title *</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Blue Backpack"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Category *</label>
            <select
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Accessories">Accessories</option>
              <option value="Documents">Documents</option>
              <option value="Sports">Sports</option>
              <option value="Books">Books</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Type *</label>
            <select
              className="form-control"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Description *</label>
          <textarea
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe the item in detail..."
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Location *</label>
            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Where was it lost/found?"
              required
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Date *</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Contact Information</label>
          <input
            type="text"
            className="form-control"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder="Phone number or email for contact"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (item ? 'Update Item' : 'Report Item')}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
