const UserService = require("../services/UserService");
const JwtService = require("../services/JwtService");


const createUser = async (req, res) => {
  try {
    const reg =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { name, email, birth, phone, address, avatar, role,password} = req.body;
   
    const isEmail = reg.test(email);
    if (!email || !phone ) {
      return res.status(200).json({
        status: "err",
        message: "Trường này là bắt buộc",
      });
    } else if (!isEmail) {
      return res.status(200).json({
        status: "err",
        message: "Trường này phải là email",
      });
      }
    //    else if (password != confirmPassword) {
    //   return res.status(200).json({
    //     status: "err",
    //     message: "Mật khẩu và xác nhận mật khẩu không khớp",
    //   });
    // }

    const response = await UserService.createUser(req.body);
 
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const reg =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { email, password } = req.body;
    const isEmail = reg.test(email);
    if ( !email || !password) {
      return res.status(200).json({
        status: "err",
        message: "Trường này là bắt buộc",
      });
    } else if (!isEmail) {
      return res.status(200).json({
        status: "err",
        message: "Trường này phải là email",
      });
    } ;
    

    const response = await UserService.loginUser(req.body);
    const { access_token, refresh_token, ...userData } = response;

    res.cookie('access_token', access_token, {
      httpOnly: true, 
      secure:  true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      domain: '.hocpython-backend.onrender.com' 
    });
    res.cookie('refresh_token',refresh_token,{
      httpOnly: true, 
      secure:  true,
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
      domain: '.hocpython-backend.onrender.com' 
    });
    // res.cookie('access_token', access_token, {
    //     httpOnly: true, 
    //     secure:  false,
    //     sameSite: 'Strict',
    //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    //     // domain: '.hocpython-backend.onrender.com' 
    //   });
    //   res.cookie('refresh_token',refresh_token,{
    //     httpOnly: true, 
    //     secure:  false,
    //     sameSite: 'Strict',
    //     maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    //     // domain: '.hocpython-backend.onrender.com' 
    //   });
     return res.status(200).json(response);



  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const logoutUser = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  return res.status(200).json({
    status: "success",
    message: "Đăng xuất thành công",
  });
};

const updateUser = async (req, res) => {
  try {
  
    const userId = req.user._id;
    
    const data = req.body;
    if (!userId) {
      return res.status(404).json({
        status: "err",
        message: "Không tim thấy id người dùng",
      });
    }
    

    const response = await UserService.updateUser(userId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,

    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const {id} = req.params;

    
    const response = await UserService.deleteUser(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllUser = async (req, res) => {
  try {
    const response = await UserService.getAllUser();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const getUserByRole = async (req, res) => {
  try {
      const { role } = req.query;
      if (!role) {
          return res.status(400).json({ message: "Thiếu role" });
      }
      const response = await UserService.getUserByRole(role);
      res.status(200).json({status: "success", message:`DS User theo role: ${role}`, data: response});
  } catch (error) {
      res.status(500).json({ message: "Error getting users by role", error });
  }
};

const getDetailUser = async (req, res) => {
  try {
    const userId = req.user._id; // Lấy _id từ token đã giải mã
  
  const response = await UserService.getDetailUser(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies["refresh_token"];
    if (!token) {
      return res.status(200).json({
        status: "err",
        message: "The token is valid",
      });
    }

    const response = await JwtService.refreshToken(token);
    return res.status(200).json(response);
    
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: "Không tìm thấy có từ khóa ! trường này là bắt buộc" });
    }

    const users = await UserService.searchUsers(q);
    res.status(200).json({
      status: "success",
      message: `Tìm thấy ${users.length} người dùng với từ khóa "${q}"`,
      data: users,

    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  createUser,
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUserByRole,
  getDetailUser,
  refreshToken,
  getAllUser,
  searchUsers,
};
