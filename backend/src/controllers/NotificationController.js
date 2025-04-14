const NotificationService = require('../services/NotificationService');

// Tạo thông báo mới
const createNotification = async (req, res) => {
  try {
    const notificationData = {
      ...req.body,
      senderId: req.user._id // Lấy ID của người gửi từ token
    };
    
    const notification = await NotificationService.createNotification(notificationData);
    res.status(201).json({
      success: true,
      message: "Tạo thông báo thành công",
      data: notification
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Chỉnh sửa thông báo
const updateNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notificationData = req.body;
    console.log(notificationData)
    const notification = await NotificationService.updateNotification(notificationId, notificationData);
    res.json({
      success: true,
      message: "Chỉnh sửa thông báo thành công",
      data: notification
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};


// Lấy thông báo của user hiện tại
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await NotificationService.getUserNotifications(userId);
    res.json({
      success: true,
      data: notifications
    });
    console.log(notifications)
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Lấy tất cả thông báo (cho admin)
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationService.getAllNotifications();
    res.json({
      success: true,
      data: notifications
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Đánh dấu thông báo đã đọc
const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user._id;
    
    const notification = await NotificationService.markAsRead(notificationId, userId);
    if (!notification) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy thông báo' 
      });
    }
    
    res.json({
      success: true,
      message: "Đánh dấu đã đọc thành công",
      data: notification
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Xóa thông báo
const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await NotificationService.deleteNotification(notificationId);
    res.json({ 
      success: true,
      message: 'Xóa thông báo thành công' 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Lấy số thông báo chưa đọc
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await NotificationService.getUnreadCount(userId);
    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
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