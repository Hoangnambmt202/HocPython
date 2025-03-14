const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    status: { type: String, enum: ["in_progress", "completed"], default: "in_progress" },
    enrolledAt: { type: Date, default: Date.now },

}, { timestamps: true });

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
module.exports = Enrollment;
