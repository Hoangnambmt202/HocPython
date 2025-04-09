const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  lessonProgress: {
    type: Map,
    of: {
      completed: Boolean,
      timestamp: Date
    },
    default: {}
  },
  lastLesson: {
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    },
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter"
    },
    timestamp: Date
  },
  completedLessons: {
    type: Number,
    default: 0
  },
  totalLessons: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Middleware để tự động cập nhật tiến độ
progressSchema.pre('save', function(next) {
  if (this.lessonProgress) {
    const completed = Array.from(this.lessonProgress.values())
      .filter(progress => progress.completed).length;
    
    this.completedLessons = completed;
    this.progress = this.totalLessons > 0 
      ? (completed / this.totalLessons) * 100 
      : 0;
  }
  next();
});

const Progress = mongoose.model("Progress", progressSchema);

module.exports = Progress;
