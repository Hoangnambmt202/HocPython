const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generalAccessToken , generateRefreshToken} = require("./JwtService");



const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
      const { name, email,  birth, phone, address, avatar, role, password , confirmPassword} = newUser
      try {
        const checkUser = await User.findOne({
          email: email
        })
        if(checkUser !== null) {
          resolve({
            status: "ÔK",
            message : "the email is already"
          })
        }

        const hash = bcrypt.hashSync(password, 10);
        const createdUser = await User.create({
          name,
          email, 
          phone,
          avatar,
          role,
          birth,
          address,
          password: hash,
          confirmPassword: hash, 
        })
        if(createdUser) {
          resolve({
            status: "OK",
            message: "Đăng ký thành công",
            data: createdUser
          })
        }
      }
      catch (e) {
          reject(e);
      }
    })
}
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const {email, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });
      if (checkUser === null) {
        resolve({
          status: "err",
          message: "Email không tồn tại. Vui lòng thử lại!",
        });
      }
      const checkPassword = bcrypt.compareSync(password, checkUser.password);

      
      if (!checkPassword) {
        resolve({
          status: "err",
          message: "Mật khẩu không đúng. Vui lòng thử lại!",
     
        });
      }
      
      const access_token = await generalAccessToken(
        {
          _id: checkUser._id,
         role : checkUser.role,
        }
      );
     
      const refresh_token = await generateRefreshToken(
        {
          _id: checkUser._id,
          role : checkUser.role,
        }
      );
      const { password: _, ...userData } = checkUser.toObject();
      
      resolve({
        status: "success",
        message: "Đăng nhập thành công",
        data: userData,
        access_token,
        refresh_token,

      });
      
    } catch (e) {
      reject(e);
    }
  });
};
const updateUser = (id,data) => {
  return new Promise(async (resolve, reject) => {
   
    try {
      const checkUser = await User.findOne({_id:id});
      
      if(checkUser === null) {
        resolve({
          status: "OK",
          message: "Không tìm thấy người dùng"
        })
      };
      const updatedUser = await User.findByIdAndUpdate(id,data, {new: true});

      
      resolve({
        status: "OK",
        message: `Cập nhật thành công ! `,
        data: updatedUser,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ _id: id });

      if (checkUser === null) {
        resolve({
          status: "OK",
          message: "Không tìm thầy người dùng",
        });
      }

      await User.findByIdAndDelete(id);

      resolve({
        status: "OK",
        message: `Xoá thành công user: ${checkUser.name} với email :${checkUser.email}`,
  
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getAllUser = (role) => {
  return new Promise(async (resolve, reject) => {
    try {
      let filter = {};
      if (role) {
        filter.role = role; // Lọc theo role nếu được cung cấp
      }
      const user = await User.find(filter);
      resolve({
        status: "OK",
        message: "Danh sách người dùng",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const getDetailUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(id).select("-password");

      if (
        user === null) {
        resolve({
          status: "err",
          message: "Không tìm thấy người dùng",

        });
      }
      
      resolve({
        status: "success",
        message: "Chi tiết người dùng",
        data: user,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailUser,
 
};