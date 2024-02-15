const { verify } = require("jsonwebtoken");
const  UserModel  = require("../mongodb/userSchema.js");
const  ErrorHandler  = require("./errorHandler.js");

const cookieVerify = async (req, res, next) => {
  const { token } = req.query;
  const decoded = verify(token, process.env.JWT_KEY);
  const user = await UserModel.findOne({userId: decoded.id});
  if (!user) return next(new ErrorHandler("please login first", 404));
  req.user = user;
  next();
};

module.exports = cookieVerify;
