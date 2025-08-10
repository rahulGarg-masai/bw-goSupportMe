const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  learner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Learner',
    required: true
  },
  status: {
    type: String,
    enum: ['registered', 'attended', 'absent', 'cancelled'],
    default: 'registered'
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String
  },
  notes: String
});

const sessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  scheduledTime: {
    type: Date,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    min: 15
  },
  maxParticipants: {
    type: Number,
    default: 10,
    min: 1
  },
  attendance: [attendanceSchema],
  sessionNotes: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isArchived: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

sessionSchema.pre('save', function(next) {
  if (this.isModified('isActive') && !this.isActive) {
    this.attendance.forEach(att => {
      if (att.status === 'registered') {
        att.status = 'cancelled';
      }
    });
  }
  next();
});

sessionSchema.methods.addLearner = function(learnerId) {
  const existingAttendance = this.attendance.find(att => 
    att.learner.toString() === learnerId.toString()
  );
  
  if (!existingAttendance && this.attendance.length < this.maxParticipants) {
    this.attendance.push({ learner: learnerId });
    return true;
  }
  return false;
};

sessionSchema.methods.removeLearner = function(learnerId) {
  this.attendance = this.attendance.filter(att => 
    att.learner.toString() !== learnerId.toString()
  );
};

sessionSchema.methods.archiveSession = function() {
  this.isArchived = true;
  this.isActive = false;
  return this.save();
};

sessionSchema.statics.findActive = function() {
  return this.find({ isActive: true, isArchived: false });
};

sessionSchema.statics.findArchived = function() {
  return this.find({ isArchived: true });
};

module.exports = mongoose.model('Session', sessionSchema);