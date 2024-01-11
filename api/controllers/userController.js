const jwt = require("jsonwebtoken");

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
}

module.exports = new UserController();
