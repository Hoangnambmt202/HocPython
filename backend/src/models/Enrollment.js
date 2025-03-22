const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    status: { type: String, enum: ["in_progress", "completed"], default: "in_progress" },
    enrolledAt: { type: Date, default: () => new Date(new Date().getTime() + 7 * 60 * 60 * 1000) }, // GMT+7
  },
  { timestamps: true } // `createdAt`, `updatedAt` tự động thêm
);

// Chuyển `createdAt`, `updatedAt` về GMT+7 trước khi lưu
enrollmentSchema.pre("save", function (next) {
  const now = new Date();
  this.createdAt = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  this.updatedAt = new Date(now.getTime() + 7 * 60 * 60 * 1000);
  next();
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
