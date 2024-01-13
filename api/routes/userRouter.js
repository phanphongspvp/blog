const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.get("/profile", userController.home);
router.get("/userById/:id", userController.userById);
router.put("/editUser", userController.editUser);

module.exports = router;
