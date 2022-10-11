const User = require("../../../models/usersModel");

const checkUser = async (req, res, next) => {
	const { id } = req.params;
	const user = await User.findById(id);

	if (user) {
		next();
	} else {
		res.status(404).send("Not found user!");
	}
};

module.exports = {
	checkUser,
};
