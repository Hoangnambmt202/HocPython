
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  avatar: {
    type: String,
    default: '/src/assets/imgs/default-avatar.jpg',
  },
  birth: {type: String},
  phone: { type: String, require: true },
  school: {type: String},
  major: {type: String},
  access_token: { type: String, require: true },
  refresh_token: { type: String, require: true },
},
{
    timestamps:true
}
);
const User = mongoose.model('User', userSchema);
module.exports = User;