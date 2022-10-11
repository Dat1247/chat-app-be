const express = require("express");
const {
	registerUser,
	loginUser,
	setUserAvatar,
	getAllUsers,
} = require("../controllers/users.controller");
const { checkEmail } = require("../middlewares/validations/checkEmail");
const { checkUser } = require("../middlewares/validations/checkUser");
const { checkUsername } = require("../middlewares/validations/checkUsername");

const userRouter = express.Router();

userRouter.post("/register", checkUsername, checkEmail, registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/set-avatar/:id", checkUser, setUserAvatar);
userRouter.get("/get-all-user/:id", getAllUsers);

module.exports = {
	userRouter,
};
