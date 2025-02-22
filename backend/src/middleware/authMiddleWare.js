const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = async (req, res,next) => {
    
    const token = req.headers['authorization'].split(" ")[1];
  
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
     if(err) {
         return res.status(404).json({
             status: "err",
             message: "Token is not valid"
         });
     }
     else {
         next();
     }
    });


};


module.exports = {
    authMiddleWare,
    
};