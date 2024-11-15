const express = require("express")

const { register, login, profile, getUser, getUserById, putUser } = require("../controllers/user.controller");
const { isAdmin } = require("../../middleware/auth")
const { isAuth } = require("../../middleware/auth");
const { isAuthProfile} = require("../../middleware/profile-auth");
const router = express.Router()

router.get("/profile/:id", profile);
router.get("/id/:id", getUserById);
router.put("/edit/:id", putUser);
router.post("/register", register);
router.post("/login", login);
router.get("/profile", [isAuth], profile); 
router.get("/allusers", [isAdmin], getUser);




module.exports = router;