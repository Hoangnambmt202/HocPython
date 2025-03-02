const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }, // Tên danh mục
    description: { type: String }, // Mô tả danh mục
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category", default: null }, // Danh mục cha (nếu có)
    
},{
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
