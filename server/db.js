const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/poc_keyserver'

// connecting to database
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});
mongoose.connection.on("error", () => {
  console.log("mongodb connection error");
});
mongoose.connection.once("open", () => {
  console.log("mongodb connection success");
});

module.exports = mongoose;