const certificateSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    issueDate: { type: Date, default: Date.now },
    certificateUrl: { type: String, required: true } // Đường dẫn đến chứng chỉ
},{
    timestamp: true
});

const Certificate = mongoose.model("Certificate", certificateSchema);
module.exports = Certificate;
