const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

class UserController {
  home(req, res) {
    const token = req.cookies.token;
    const secretJwt = process.env.JWT_SECRET;

    if (token) {
      jwt.verify(token, secretJwt, {}, (err, userToken) => {
        if (err) throw err;
        res.json(userToken);
      });
    } else {
      res.json("no-token");
    }
  }

  async userById(req, res) {
    const id = req.params.id;

    const userDoc = await User.findOne({ _id: id });
    res.json(userDoc);
  }

  async editUser(req, res) {
    const { id, avatar, description, birth } = req.body;

    const userDoc = await User.updateOne(
      { _id: id },
      {
        avatar,
        describeYourself: description,
        dateOfBirth: birth,
      }
    );

    res.json(userDoc);
  }
}

module.exports = new UserController();
