const Category = require("../models/Category");
const slugify = require("slugify");

class CategoryService {
  // Thêm danh mục mới
  static async createCategory(name, parent = null) {
    const slug = slugify(name, { lower: true });

    // Tạo object danh mục mới với parent nếu có
    const newCategory = new Category({ name, slug, parent });

    await newCategory.save();
    return newCategory;
  }

  // Lấy tất cả danh mục (không có children trong object)
  static async getCategories() {
    return await Category.find().lean(); // Trả về toàn bộ danh mục
  }
}

module.exports = CategoryService;
