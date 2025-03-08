const mongoose = require('mongoose');

const paymentSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    paymentMethod: { type: String,  enum:["MOMO","ZaloPay", "Thẻ nội địa", "Thẻ quốc tế", "Chuyển khoản"], required: true },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;