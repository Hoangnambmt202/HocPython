const { cloudinary } = require('../config/cloudinary');

class CloudinaryService {
  static async uploadImage(filePath) {
    try {
      const result = await cloudinary.uploader.upload(filePath);
      return {
        url: result.secure_url,
        public_id: result.public_id
      };
    } catch (error) {
      throw new Error(`Cloudinary upload error: ${error.message}`);
    }
  }

  static async deleteImage(publicId) {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      throw new Error(`Cloudinary delete error: ${error.message}`);
    }
  }
}

module.exports = CloudinaryService;