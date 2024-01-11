const mongoose = require("mongoose");

const connect = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected Database");
  } catch (err) {
    console.error("Connect Fail:", err);
  }
};

module.exports = { connect };
