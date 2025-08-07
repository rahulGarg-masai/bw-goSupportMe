const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    maxlength: 12
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  borrowedBooks: [{
    _id: {
      type: String,
      ref: 'Book'
    },
    title: String
  }]
}, { _id: false });

module.exports = mongoose.model('Member', memberSchema);