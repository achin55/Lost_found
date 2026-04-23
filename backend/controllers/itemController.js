const Item = require('../models/Item');

// Create Item
const createItem = async (req, res) => {
  try {
    const { title, description, category, type, location, date, contactInfo, image } = req.body;

    // Validation
    if (!title || !description || !category || !type || !location) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newItem = new Item({
      title,
      description,
      category,
      type,
      location,
      date: date || new Date(),
      contactInfo,
      image,
      userId: req.user.userId
    });

    const savedItem = await newItem.save();

    res.status(201).json({
      message: 'Item created successfully',
      item: savedItem
    });
  } catch (error) {
    console.error('Create Item Error:', error);
    res.status(500).json({ message: 'Error creating item', error: error.message });
  }
};

// Get All Items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find()
      .populate('userId', 'name email contactInfo')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Items retrieved successfully',
      count: items.length,
      items
    });
  } catch (error) {
    console.error('Get Items Error:', error);
    res.status(500).json({ message: 'Error retrieving items', error: error.message });
  }
};

// Get User's Items
const getUserItems = async (req, res) => {
  try {
    const items = await Item.find({ userId: req.user.userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'User items retrieved successfully',
      count: items.length,
      items
    });
  } catch (error) {
    console.error('Get User Items Error:', error);
    res.status(500).json({ message: 'Error retrieving user items', error: error.message });
  }
};

// Get Single Item
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('userId', 'name email contactInfo');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({
      message: 'Item retrieved successfully',
      item
    });
  } catch (error) {
    console.error('Get Item Error:', error);
    res.status(500).json({ message: 'Error retrieving item', error: error.message });
  }
};

// Search Items
const searchItems = async (req, res) => {
  try {
    const { name, category, type } = req.query;

    let filter = {};

    if (name) {
      filter.$or = [
        { title: { $regex: name, $options: 'i' } },
        { description: { $regex: name, $options: 'i' } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    const items = await Item.find(filter)
      .populate('userId', 'name email contactInfo')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: 'Search completed',
      count: items.length,
      items
    });
  } catch (error) {
    console.error('Search Error:', error);
    res.status(500).json({ message: 'Error searching items', error: error.message });
  }
};

// Update Item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check ownership
    if (item.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this item' });
    }

    // Update fields
    const { title, description, category, type, location, date, contactInfo, status, image } = req.body;

    if (title) item.title = title;
    if (description) item.description = description;
    if (category) item.category = category;
    if (type) item.type = type;
    if (location) item.location = location;
    if (date) item.date = date;
    if (contactInfo) item.contactInfo = contactInfo;
    if (status) item.status = status;
    if (image) item.image = image;

    item.updatedAt = Date.now();

    const updatedItem = await item.save();

    res.status(200).json({
      message: 'Item updated successfully',
      item: updatedItem
    });
  } catch (error) {
    console.error('Update Item Error:', error);
    res.status(500).json({ message: 'Error updating item', error: error.message });
  }
};

// Delete Item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check ownership
    if (item.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: 'Item deleted successfully'
    });
  } catch (error) {
    console.error('Delete Item Error:', error);
    res.status(500).json({ message: 'Error deleting item', error: error.message });
  }
};

module.exports = {
  createItem,
  getAllItems,
  getUserItems,
  getItemById,
  searchItems,
  updateItem,
  deleteItem
};
