const User = require("../../../models/usersModel");

const checkEmail = async (req, res, next) => {
	const { email } = req.body;
	const emailCheck = await User.findOne({ email });
	if (emailCheck) {
		res.status(403).send({ message: "Email already used!" });
	} else {
		next();
	}
};

module.exports = { checkEmail };
