const multer = require('multer');
const path = require('path');
const { storage } = require('../config/cloudinary');
const CloudinaryService = require('../services/CloudinaryService');

// Cấu hình Multer để xử lý upload tạm
const upload = multer({ 
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  })
});

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await CloudinaryService.uploadImage(req.file.path);
    
    // Xóa file tạm sau khi upload lên Cloudinary thành công
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      success: true,
      imageUrl: result.url,
      publicId: result.public_id
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

module.exports = { upload, uploadImage };