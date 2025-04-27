// src/routes/uploadRoutes.js
const express = require('express');
const UploadController = require('../controllers/CloudinaryController');
const {authMiddleware} = require('../middleware/authMiddleWare');

const router = express.Router();

// Route để upload avatar cho người dùng
router.post('/avatar',authMiddleware, UploadController.uploadImage, UploadController.uploadAvatar);

// Route để upload thumbnail cho khóa học
router.post('/thumbnail',authMiddleware, UploadController.uploadImage, UploadController.uploadThumbnail);

module.exports = router;
