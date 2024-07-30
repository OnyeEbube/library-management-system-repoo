const User = require("../models/user.model");

const UserService = {};

UserService.getUser = async (filter, projection = {}) => {
	return await User.findOne(filter, projection);
};

UserService.getUserById = async (id) => {
	return await User.findById({ _id: id }).select("-password");
};

UserService.getUsers = async () => {
	return await User.find();
};

UserService.createUser = async (data) => {
	const user = new User(data);
	return await user.save();
};

UserService.updateUser = async (id, data) => {
	return await User.findByIdAndUpdate(id, data, { new: true }).select(
		"-password"
	);
};

UserService.deleteUser = async (id) => {
	return await User.findByIdAndDelete(id).select("-password");
};

module.exports = { UserService };
