const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const access_token = req.cookies.access_token;
  
  if (!access_token) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" });
  }
  
  try {
    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    
    return res.status(403).json({ message: "Token không hợp lệ, vui lòng đăng nhập lại ! " });
  }
};


module.exports = {
    authMiddleware,
   
};