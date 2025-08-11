const express = require('express');
const { newPublisher, getAllPublishers, getPublisher, updatePublisher, deletePublisher } = require('../controllers/publisher.controller');

const PublisherRouter = express.Router();

PublisherRouter.post('/api/publishers',newPublisher);

PublisherRouter.get('/api/publishers',getAllPublishers);

PublisherRouter.get('api/publishers/:id',getPublisher);

PublisherRouter.put('/api/publishers/:id',updatePublisher)

PublisherRouter.delete('api/publishers/:id',deletePublisher)








module.exports = PublisherRouter;