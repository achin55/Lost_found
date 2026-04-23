const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide item title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: ['Electronics', 'Clothing', 'Accessories', 'Documents', 'Sports', 'Books', 'Other']
  },
  type: {
    type: String,
    required: [true, 'Please select item type'],
    enum: ['Lost', 'Found']
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    maxlength: [100, 'Location cannot be more than 100 characters']
  },
  date: {
    type: Date,
    required: [true, 'Please provide date'],
    default: Date.now
  },
  image: {
    type: String,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Resolved', 'Closed'],
    default: 'Active'
  },
  contactInfo: {
    type: String,
    maxlength: [100, 'Contact info cannot be more than 100 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Item', ItemSchema);
