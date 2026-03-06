const jwt = require("jsonwebtoken");
const User = require("../models/authModel");
exports.authenticateUser = async (req, res, next) => {
 
  try {
    const token = req.cookies?.token;
  
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
