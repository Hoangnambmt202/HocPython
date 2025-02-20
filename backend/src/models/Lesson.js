const mongoose = require('mongoose');

const lessonSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { typr: String, required: true },
    content : { type: String, required: true },
    videoUrl: { type: String, required: true },
    order: {type: String, required: true },
    isFree: { type: Boolean, default: false },
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;