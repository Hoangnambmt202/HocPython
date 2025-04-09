// src/config/config.js
require('dotenv').config();

module.exports = {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379
  },
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/hocpython',
  // thêm config khác nếu cần
};
