const express = require("express");
const { route } = require("../app");
const router = express.Router();

const {newUser,loginUser} = require("../controllers/userController");


router.route("/users/new").post(newUser);
router.route("/users/login").post(loginUser);

module.exports = router;