const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Bạn chưa đăng nhập" });
  }
  const token = authHeader.split(" ")[1];  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    
    return res.status(403).json({ message: "Token không hợp lệ, vui lòng đăng nhập lại ! " });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
          return res.status(403).json({ message: 'Bạn không có quyền truy cập!' });
      }
      next();
  };
};

module.exports = {
    authMiddleware,
    authorizeRoles
};