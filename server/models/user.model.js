const mongoose = require("mongoose");
const { v4: uuid4 } = require("uuid"); // uuid.v4() gives uuids

const UserSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      default: uuid4,
    },
    email: {
      type: String,
      required: true,
    },
    public_key: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("user", UserSchema);
