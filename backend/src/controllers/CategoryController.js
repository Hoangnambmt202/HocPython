const CategoryService = require("../services/CategoryService");

class CategoryController {
  // API tạo danh mục
  static async createCategory(req, res) {
    try {
      const { name, parent } = req.body;
      const category = await CategoryService.createCategory(name, parent);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }

  // API lấy danh sách danh mục
  static async getCategories(req, res) {
    try {
      const categories = await CategoryService.getCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: "Lỗi server", error });
    }
  }
}

module.exports = CategoryController;
