const express = require("express");
const { messageRouter } = require("./message.router");
const { userRouter } = require("./users.router");

const rootRouter = express.Router();

rootRouter.use("/users", userRouter);
rootRouter.use("/messages", messageRouter);

module.exports = {
	rootRouter,
};
