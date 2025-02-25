const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Khóa học mà bình luận thuộc về
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người bình luận
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: false }, // Bình luận về một bài học (nếu có)
    content: { type: String, required: true }, // Nội dung bình luận
    
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
