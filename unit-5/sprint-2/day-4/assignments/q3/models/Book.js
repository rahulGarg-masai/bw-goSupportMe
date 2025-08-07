const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 12
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  genres: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['available', 'borrowed'],
    default: 'available'
  },
  borrowers: [{
    type: String,
    ref: 'Member'
  }]
}, { _id: false });

module.exports = mongoose.model('Book', bookSchema);