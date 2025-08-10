const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  expertise: [{
    type: String,
    required: true
  }],
  bio: {
    type: String,
    trim: true
  },
  experience: {
    type: Number,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
  }]
}, {
  timestamps: true
});

mentorSchema.pre('save', async function(next) {
  if (this.isModified('isActive') && !this.isActive) {
    const Session = mongoose.model('Session');
    await Session.updateMany(
      { mentor: this._id, isActive: true },
      { isActive: false }
    );
  }
  next();
});

mentorSchema.methods.softDelete = async function() {
  this.isActive = false;
  await this.save();
};

mentorSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

module.exports = mongoose.model('Mentor', mentorSchema);