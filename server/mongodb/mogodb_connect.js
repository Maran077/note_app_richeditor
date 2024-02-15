const mongoose = require("mongoose");

exports.mongodbConnection = async () => {
  await mongoose
    .connect(process.env.MONGODB_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database is connected");
    })
    .catch((e) => {
      console.error(e);
      process.exit(1);
    });
};
