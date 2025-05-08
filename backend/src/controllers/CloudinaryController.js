// src/controllers/uploadController.js
const User = require('../models/User');
const Course = require('../models/Course');
const { upload } = require('../config/cloudinary'); // dùng upload đã cấu hình sẵn



class UploadController {
  static uploadImage(req, res, next) {
    upload.single('image')(req, res, function (err) {
      if (err) {
        return res.status(500).json({ error: 'Error while uploading image' });
      }
      next();
    });
  }

  // Để upload ảnh đại diện cho người dùng
  static async uploadAvatar(req, res) {
    try {
      console.log(req.file); // Kiểm tra xem file đã được upload thành công chưa
      const imageUrl = req.file.path; // Lấy URL ảnh từ Cloudinary
      const userId = req.user._id; 
      const user = await User.findByIdAndUpdate(userId, { avatar: imageUrl }, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log(imageUrl);
      res.status(200).json({ message: 'Avatar updated successfully', avatar: imageUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload avatar' });
    }
  }

  // Để upload ảnh thumbnail cho khóa học
  static async uploadThumbnail(req, res) {
    try {
      const imageUrl = req.file.path; // Lấy URL ảnh từ Cloudinary
      const courseId = req.body.courseId; // Lấy ID khóa học từ request body

      const course = await Course.findByIdAndUpdate(courseId, { thumbnail: imageUrl }, { new: true });
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }

      res.status(200).json({ message: 'Thumbnail updated successfully', thumbnail: imageUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to upload thumbnail' });
    }
  }
}

module.exports = UploadController;
