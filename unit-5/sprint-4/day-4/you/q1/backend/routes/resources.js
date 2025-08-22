const express = require('express');
const Resource = require('../models/Resource');
const { authenticateToken, authorize } = require('../middleware/auth');
const { resourceValidation } = require('../middleware/validation');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { category, status, search } = req.query;

    let query = {};

    if (req.user.role === 'user') {
      query.$or = [
        { createdBy: req.user._id },
        { 'metadata.isPublic': true }
      ];
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const resources = await Resource.find(query)
      .populate('createdBy', 'username email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalResources = await Resource.countDocuments(query);
    const totalPages = Math.ceil(totalResources / limit);

    res.json({
      resources,
      pagination: {
        currentPage: page,
        totalPages,
        totalResources,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get resources error:', error);
    res.status(500).json({ message: 'Failed to retrieve resources' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('createdBy', 'username email role');

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (req.user.role === 'user' && 
        resource.createdBy._id.toString() !== req.user._id.toString() && 
        !resource.metadata.isPublic) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ resource });
  } catch (error) {
    console.error('Get resource error:', error);
    res.status(500).json({ message: 'Failed to retrieve resource' });
  }
});

router.post('/', authenticateToken, resourceValidation, async (req, res) => {
  try {
    const resourceData = {
      ...req.body,
      createdBy: req.user._id
    };

    if (req.body.metadata) {
      resourceData.metadata = {
        ...resourceData.metadata,
        ...req.body.metadata
      };
    }

    const resource = new Resource(resourceData);
    await resource.save();

    const populatedResource = await Resource.findById(resource._id)
      .populate('createdBy', 'username email role');

    res.status(201).json({
      message: 'Resource created successfully',
      resource: populatedResource
    });
  } catch (error) {
    console.error('Create resource error:', error);
    res.status(500).json({ message: 'Failed to create resource' });
  }
});

router.put('/:id', authenticateToken, resourceValidation, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (req.user.role === 'user' && resource.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updateData = { ...req.body };
    if (req.body.metadata) {
      updateData.metadata = {
        ...resource.metadata,
        ...req.body.metadata
      };
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'username email role');

    res.json({
      message: 'Resource updated successfully',
      resource: updatedResource
    });
  } catch (error) {
    console.error('Update resource error:', error);
    res.status(500).json({ message: 'Failed to update resource' });
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    const canDelete = req.user.role === 'admin' || 
                     req.user.role === 'moderator' ||
                     resource.createdBy.toString() === req.user._id.toString();

    if (!canDelete) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Resource.findByIdAndDelete(req.params.id);

    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    console.error('Delete resource error:', error);
    res.status(500).json({ message: 'Failed to delete resource' });
  }
});

module.exports = router;