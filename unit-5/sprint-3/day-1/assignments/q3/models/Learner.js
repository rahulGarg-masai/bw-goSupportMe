const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
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
  interests: [{
    type: String
  }],
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
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

learnerSchema.pre('save', async function(next) {
  if (this.isModified('isActive') && !this.isActive) {
    const Session = mongoose.model('Session');
    await Session.updateMany(
      { 'attendance.learner': this._id, isActive: true },
      { $pull: { attendance: { learner: this._id } } }
    );
  }
  next();
});

learnerSchema.methods.softDelete = async function() {
  this.isActive = false;
  await this.save();
};

learnerSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

module.exports = mongoose.model('Learner', learnerSchema);