const jwt = require("jsonwebtoken");
const UserModel = require("../mongodb/userSchema.js");
const ErrorHandler = require("./errorHandler.js");

const cookieVerify = async (req, res, next) => {
  const errMsg = {
    message: "please login first",
    code: 404,
  };
  const { token } = req.query;
  if (!token) return next(new ErrorHandler(errMsg.message, errMsg.code));
  const parts = token.split(".");
  if (parts.length !== 3) next(new ErrorHandler(errMsg.message, errMsg.code));
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await UserModel.findOne({ userId: decoded.id });
  if (!user) return next(new ErrorHandler(errMsg.message, errMsg.code));
  req.user = user;
  next();
};

module.exports = cookieVerify;
