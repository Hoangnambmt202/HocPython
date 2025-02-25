const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true } // Đơn vị: phút
});

const chapterSchema = new mongoose.Schema({
    title: { type: String, required: true },
    lessons: [lessonSchema]
});

const courseSchema = new mongoose.Schema({
    
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, default: 0 },
    thumbnail: { type: String, default: "/src/assets/imgs/default-thumbnail.jpg" },
    category: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
    content: [chapterSchema],
    numberStudent : {type: Number},
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
