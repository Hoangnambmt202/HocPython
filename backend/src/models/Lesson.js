const mongoose = require('mongoose');

const lessonSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    content : { type: String, required: true },
    videoUrl: { type: String, required: true },
    order: {type: String, required: true },
   
}, { timestamps: true });

const Lesson = mongoose.model('Lesson', lessonSchema);
module.exports = Lesson;