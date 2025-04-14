const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  recipients: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    read: {
      type: Boolean,
      default: false
    },
    readAt: Date
  }],
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['individual', 'role', 'all'],
    default: 'all'
  },
  status: {
    type: String,
    enum: ['sent', 'scheduled'],
    default: 'sent'
  },
  scheduledFor: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Notification', notificationSchema); 