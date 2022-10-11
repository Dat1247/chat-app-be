const User = require("../../models/usersModel");
const bcrypt = require("bcrypt");

const registerUser = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const salt = bcrypt.genSaltSync(10);
		const hashPassword = bcrypt.hashSync(password, salt);

		const user = await User.create({
			email,
			username,
			password: hashPassword,
		});
		delete user.password;
		res.status(201).send(user);
	} catch (err) {
		console.log(err);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const userFind = await User.findOne({ username });

		if (!userFind) {
			res.status(500).send({ message: "Incorrect username or password!" });
			return;
		}
		const isAuth = bcrypt.compareSync(password, userFind.password);
		if (!isAuth) {
			res.status(500).send({ message: "Incorrect username or password!" });
			return;
		}
		const user = {
			id: userFind._id,
			username: userFind.username,
			email: userFind.email,
			isAvatarImageSet: userFind.isAvatarImageSet,
			avatarImage: userFind.avatarImage,
		};

		res.status(200).send({ message: "Log in successfully!", user });
	} catch (err) {
		console.log(err);
	}
};

const setUserAvatar = async (req, res, next) => {
	const { id } = req.params;

	try {
		const { image } = req.body;

		await User.findByIdAndUpdate(id, {
			isAvatarImageSet: true,
			avatarImage: image,
		});
		const user = await User.findById(id);

		res.status(203).send({
			isSet: user.isAvatarImageSet,
			avatarImage: user.avatarImage,
		});
	} catch (err) {
		console.log(err);
	}
};

const getAllUsers = async (req, res) => {
	const { id } = req.params;
	try {
		const users = await User.find({ _id: { $ne: id } }).select([
			"email",
			"username",
			"avatarImage",
			"_id",
		]);

		res.status(200).send(users);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	registerUser,
	loginUser,
	setUserAvatar,
	getAllUsers,
};
