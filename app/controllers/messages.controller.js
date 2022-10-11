const Message = require("../../models/messageModel");

const addMessage = async (req, res) => {
	try {
		const { from, to, message } = req.body;
		const data = await Message.create({
			message: { text: message },
			users: [from, to],
			sender: from,
		});
		if (data) {
			res.status(201).send({
				msg: "Message added successfully!",
			});
		} else {
			res.status(500).send({ msg: "Failed to add message to the database" });
		}
	} catch (err) {
		console.log(err);
	}
};

const getAllMessages = async (req, res) => {
	try {
		const { from, to } = req.body;

		const messages = await Message.find({
			users: {
				$all: [from, to],
			},
		}).sort({ updatedAt: 1 });
		const projectMessages = messages.map((msg) => {
			return {
				fromSelf: msg.sender.toString() === from,
				message: msg.message.text,
			};
		});

		res.status(200).send(projectMessages);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	addMessage,
	getAllMessages,
};
