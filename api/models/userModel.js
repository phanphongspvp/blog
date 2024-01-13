const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, default: "" },
    avatar: { type: String, default: "" },
    describeYourself: { type: String, default: "" },
    dateOfBirth: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userModel);
