import React from 'react';
import '../styles/ItemList.css';

const ItemList = ({ items, onDelete, onEdit, currentUserId }) => {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h3>No items found</h3>
        <p>Report an item or search for existing items</p>
      </div>
    );
  }

  return (
    <div className="items-grid">
      {items.map(item => (
        <div key={item._id} className="item-card">
          <div className="item-header">
            <h5 className="item-title">{item.title}</h5>
            <span className={`badge ${item.type === 'Lost' ? 'bg-danger' : 'bg-success'}`}>
              {item.type}
            </span>
          </div>

          <p className="item-category">
            <strong>Category:</strong> {item.category}
          </p>

          <p className="item-description">
            {item.description.substring(0, 100)}...
          </p>

          <div className="item-meta">
            <div className="meta-row">
              <span><strong>📍 Location:</strong> {item.location}</span>
            </div>
            <div className="meta-row">
              <span><strong>📅 Date:</strong> {new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div className="meta-row">
              <span><strong>Status:</strong> <span className="status-badge">{item.status}</span></span>
            </div>
            {item.userId && (
              <div className="meta-row">
                <span><strong>👤 Posted by:</strong> {item.userId.name}</span>
              </div>
            )}
            {item.contactInfo && (
              <div className="meta-row">
                <span><strong>📞 Contact:</strong> {item.contactInfo}</span>
              </div>
            )}
          </div>

          <div className="item-actions">
            {currentUserId === item.userId?._id && (
              <>
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(item._id)}
                >
                  Delete
                </button>
              </>
            )}
            <button className="btn btn-sm btn-info">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
