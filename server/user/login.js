const jwt = require("jsonwebtoken");
const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");
const UserModel = require("../mongodb/userSchema");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user = await UserModel.findOne({ userId: profile.id });
      if (!user) {
        user = await UserModel.create({
          userId: profile.id,
          userName: profile.displayName,
          userProfile:
            profile.photos && profile.photos.length > 0
              ? profile.photos[0].value
              : null,
        });
      }
      return cb(null, user);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((_user, cb) => {
  const user = _user;
  const token = jwt.sign({ id: user.userId }, process.env.JWT_KEY);
  user.token = token;
  cb(null, user);
});

module.exports = passport;
