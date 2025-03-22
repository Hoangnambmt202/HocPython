const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    lecturerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, default: 0 },
    discountPrice: { type: Number, default: 0 }, // Giá khuyến mãi
    thumbnail: { type: String, default: "/src/assets/imgs/default-thumbnail.jpg" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }, // Liên kết danh mục
    tags: [{ type: String }], // Hỗ trợ tìm kiếm từ khóa
    isPublished: { type: Boolean, default: false },
    content: [{type: mongoose.Schema.Types.ObjectId, ref: "Chapter"}],
    duration: { type: Number, default: 0 },  // Tổng thời lượng khóa học (tính từ các Lesson)
    numberStudent: { type: Number, default: 0 }, // Mặc định 0 nếu chưa có học viên
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Danh sách học viên đăng ký
    rating: { type: Number, default: 0 }, // Điểm đánh giá trung bình
    ratingCount: { type: Number, default: 0 },  // Tổng số lượt đánh giá
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    level: { type: String, enum: [ "Beginner", "Advanced"], default: "Beginner" },
    requirements: [{ type: String }], // Danh sách yêu cầu đầu vào
    objectives: [{ type: String }],  // Học viên đạt được gì sau khóa học
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
