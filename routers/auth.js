const express = require("express");
const { register, getUser, login, logout } = require("../controllers/auth");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getAccessToRoute, getUser);
router.post("/user", getAccessToRoute, getUser);
router.get("/logout",getAccessToRoute, logout);

module.exports = router;

