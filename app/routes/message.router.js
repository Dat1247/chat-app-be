const express = require("express");
const {
	getAllMessages,
	addMessage,
} = require("../controllers/messages.controller");

const messageRouter = express.Router();

messageRouter.post("/add-msg", addMessage);
messageRouter.post("/get-all-msg", getAllMessages);

module.exports = {
	messageRouter,
};
