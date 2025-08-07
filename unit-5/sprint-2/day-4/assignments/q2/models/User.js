const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  rentals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);