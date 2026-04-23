const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createItem,
  getAllItems,
  getUserItems,
  getItemById,
  searchItems,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', auth, createItem);

// @route   GET /api/items
// @desc    Get all items
// @access  Public
router.get('/', getAllItems);

// @route   GET /api/items/my-items
// @desc    Get user's items
// @access  Private
router.get('/my-items', auth, getUserItems);

// @route   GET /api/items/search
// @desc    Search items by name or category
// @access  Public
router.get('/search', searchItems);

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Public
router.get('/:id', getItemById);

// @route   PUT /api/items/:id
// @desc    Update item
// @access  Private
router.put('/:id', auth, updateItem);

// @route   DELETE /api/items/:id
// @desc    Delete item
// @access  Private
router.delete('/:id', auth, deleteItem);

module.exports = router;
