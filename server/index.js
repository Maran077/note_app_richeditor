const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const cookieParser = require("cookie-parser");
const { mongodbConnection } = require("./mongodb/mogodb_connect.js");
const expressSession = require("express-session");

const app = express();

config();
mongodbConnection();

const passport = require("./user/login.js");
const ErrorHandler = require("./middlewere/errorHandler.js");
const jwt = require("jsonwebtoken");
const catchAndAsync = require("./middlewere/catchAndAsync.js");
const UserModel = require("./mongodb/userSchema.js");
const router = require("./note/noteRouter.js");
const errorMiddleware = require("./middlewere/error.js");

app.use(
  expressSession({
    secret: process.env.GOOGLE_CLIENT_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ origin: process.env.DOMAIN, credentials: true }));
app.use(express.json());

app.use("/notes", router);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/failure", (req, res) => {
  const message = {
    success: false,
    message: "Please login again",
  };
  res
    .status(401)
    .redirect(`${process.env.DOMAIN}?message=${encodeURIComponent(message)}`);
});

app.get("/auth/success", (req, res) => {
  const { token } = req.user;
  res
    .status(200)
    .redirect(`${process.env.DOMAIN}?token=${encodeURIComponent(token)}`);
});

app.get(
  "/profile",
  catchAndAsync(async (req, res, next) => {
    const { token } = req.query;
    const err = { message: "Users is not find", status: 403 };
    if (!token) return next(new ErrorHandler(err.message, err.status));
    const decodeToken = decodeURIComponent(token);
    const decoded = jwt.verify(decodeToken, process.env.JWT_KEY);
    const user = await UserModel.findOne({ userId: decoded.id });
    if (!user) return next(new ErrorHandler(err.message, err.status));
    res.status(200).json({ success: true, user: user });
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/failure",
    successRedirect: "/auth/success",
    //session: false,
  })
);

app.use(errorMiddleware)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Online now"));
