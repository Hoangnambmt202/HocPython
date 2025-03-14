const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // Nếu null thì đây là danh mục cha
    },
  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
