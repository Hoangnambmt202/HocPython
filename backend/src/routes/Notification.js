const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/NotificationController');
const { authMiddleware } = require('../middleware/authMiddleWare');


// Tạo thông báo mới
router.post('/', authMiddleware, NotificationController.createNotification);

// Chỉnh sửa thông báo
router.put('/update/:notificationId', authMiddleware, NotificationController.updateNotification);

// Lấy thông báo của user hiện tại
router.get('/user', authMiddleware, NotificationController.getUserNotifications);

// Lấy tất cả thông báo (cho admin)
router.get('/all', authMiddleware, NotificationController.getAllNotifications);

// Đánh dấu thông báo đã đọc
router.put('/:notificationId/read', authMiddleware, NotificationController.markAsRead);

// Xóa thông báo
router.delete('/:notificationId', authMiddleware, NotificationController.deleteNotification);

// Lấy số thông báo chưa đọc
router.get('/unread/count', authMiddleware, NotificationController.getUnreadCount);

module.exports = router; 