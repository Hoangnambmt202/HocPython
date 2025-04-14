const Notification = require('../models/Notification');
const User = require('../models/User');

// Tạo thông báo mới
const createNotification = async (data) => {
  try {
    const { title, message, recipientIds, senderId, type = 'individual', scheduledFor, role } = data;

    let recipients = [];

    if (type === 'all') {
      const users = await User.find({ role: 'user' });
      recipients = users.map(user => ({ userId: user._id }));
    } else if (type === 'role') {
      if (!role) throw new Error('Role is required when type is role');
      const users = await User.find({ role });
      recipients = users.map(user => ({ userId: user._id }));
    } else {
      if (!recipientIds || !Array.isArray(recipientIds)) {
        throw new Error('recipientIds must be an array');
      }
      recipients = recipientIds.map(userId => ({ userId }));
    }

    const notification = new Notification({
      title,
      message,
      recipients,
      sender: senderId,
      type,
      status: scheduledFor ? 'scheduled' : 'sent',
      scheduledFor
    });

    await notification.save();
    return notification;
  } catch (error) {
    throw error;
  }
};

const updateNotification = async (notificationId, data) => {
  try {
    const notification = await Notification.findByIdAndUpdate(notificationId, data, { new: true });
    return notification;
  } catch (error) { 
    throw error;
  }
};


// Lấy tất cả thông báo của một user
const getUserNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({
      'recipients.userId': userId
    })
    .populate('sender', 'name email')
    .sort({ createdAt: -1 });

    return notifications;
  } catch (error) {
    throw error;
  }
};

// Lấy tất cả thông báo (cho admin)
const getAllNotifications = async () => {
  try {
    const notifications = await Notification.find()
      .populate('sender', 'name email')
      .populate('recipients.userId', 'name email')
      .sort({ createdAt: -1 });

    return notifications;
  } catch (error) {
    throw error;
  }
};

// Đánh dấu thông báo đã đọc
const markAsRead = async (notificationId, userId) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      {
        _id: notificationId,
        'recipients.userId': userId
      },
      {
        $set: {
          'recipients.$.read': true,
          'recipients.$.readAt': new Date()
        }
      },
      { new: true }
    );

    return notification;
  } catch (error) {
    throw error;
  }
};

// Xóa thông báo
const deleteNotification = async (notificationId) => {
  try {
    await Notification.findByIdAndDelete(notificationId);
    return { success: true };
  } catch (error) {
    throw error;
  }
};

// Đếm số thông báo chưa đọc của user
const getUnreadCount = async (userId) => {
  try {
    const count = await Notification.countDocuments({
      'recipients.userId': userId,
      'recipients.read': false
    });
    
    return count;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNotification,
  updateNotification,
  getUserNotifications,
  getAllNotifications,
  markAsRead,
  deleteNotification,
  getUnreadCount
}; 