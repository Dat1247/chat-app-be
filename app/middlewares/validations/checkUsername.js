const User = require("../../../models/usersModel");

const checkUsername = async (req, res, next) => {
	const { username } = req.body;
	const usernameCheck = await User.findOne({ username });
	if (usernameCheck) {
		res.status(403).send({ message: "Username already used!" });
	} else {
		next();
	}
};

module.exports = { checkUsername };
