const mongoose = require('mongoose');

const courseSchema =  new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    instructor: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    price: {type: Number, default: 0},
    thumbnail: {type: String , default: "/src/assets/imgs/default-thumbnail.jpg"},
    category: {type: String, required: true},
    isPublished: {type: Boolean, default: false},

},
{timestamps: true})

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;