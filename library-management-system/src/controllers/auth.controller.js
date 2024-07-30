const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserService } = require("../services/auth.service");
require("dotenv").config();

const AuthController = {};

AuthController.createUser = async (req, res) => {
	try {
		const { name, email, password, role } = req.body;
		const existingUser = await UserService.getUser({ email });
		if (existingUser) {
			return res.status(400).json({ error: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const createdUser = await UserService.createUser({
			name,
			email,
			password: hashedPassword,
			role,
		});
		const token = jwt.sign({ _id: createdUser._id }, process.env.SECRET_KEY, {
			expiresIn: process.env.SECRET_KEY_EXPIRES_IN,
		});
		const user = await UserService.getUser(
			{ _id: createdUser._id },
			{ password: 0 }
		);
		res.status(201).json({
			message: "Sign up successful",
			user,
			token,
		});
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

AuthController.loginUser = async (req, res) => {
	try {
		const { email, password, role } = req.body;
		const loggedinUser = await UserService.getUser({ email });
		if (!loggedinUser || !bcrypt.compare(password, loggedinUser.password)) {
			return res.status(401).json({ error: "Invalid credentials" });
		}
		const token = jwt.sign({ _id: loggedinUser._id }, process.env.SECRET_KEY, {
			expiresIn: process.env.SECRET_KEY_EXPIRES_IN,
		});
		const user = await UserService.getUser(
			{ _id: loggedinUser._id },
			{ password: 0 }
		);
		res.status(201).json({
			message: "Log in successful",
			user,
			token,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

AuthController.getUser = async (req, res) => {
	try {
		console.log(req.user);
		const { id } = req.user;
		const user = await UserService.getUserById(id);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}
		res.json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

AuthController.getUsers = async (req, res) => {
	try {
		const users = await UserService.getUsers();
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

AuthController.updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedUser = await UserService.updateUser(id, req.body);
		if (!updatedUser) {
			return res.status(400).json("User does not exist");
		}
		res.json(updatedUser);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

AuthController.deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedUser = await UserService.deleteUser(id);
		if (!deletedUser) {
			return res.status(400).json("User does not exist");
		}
		res.status(201).json({ message: "User deleted successfully", deletedUser });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

module.exports = { AuthController };
