const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;
    const secretJwt = process.env.JWT_SECRET;

    try {
      const userDataEmail = await User.findOne({ email });
      const comparePassword = await bcrypt.compare(
        password,
        userDataEmail.password
      );
      if (!comparePassword) {
        return res.json("no-user");
      }

      jwt.sign(
        { userId: userDataEmail, email },
        secretJwt,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({ userId: userDataEmail, email });
        }
      );
    } catch (err) {
      return res.json("no-user");
    }
  }

  async register(req, res) {
    const { email, password } = req.body;
    const secretJwt = process.env.JWT_SECRET;

    try {
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        return res.json("fail");
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const userDoc = await User.create({ email, password: hashPassword });
      jwt.sign({ userId: userDoc._id, email }, secretJwt, {}, (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({ userId: userDoc._id, email });
      });
    } catch (err) {
      console.error("Register err:", err);
    }
  }
}

module.exports = new AuthController();
