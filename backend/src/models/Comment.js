const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true }, // Khóa học mà bình luận thuộc về
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người bình luận
    lessonId: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson", required: false }, // Bình luận về một bài học (nếu có)
    content: { type: Text, required: true }, // Nội dung bình luận
    
}, {
    timestamps: true
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
