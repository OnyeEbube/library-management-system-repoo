const jwt = require("jsonwebtoken");
const { UserService } = require("../services/auth.service.js");

const adminAuth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		if (!token) {
			return res.status(401).json({ error: "No token provided" });
		}

		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		console.log(decoded);
		// const user = await User.findById({ _id: decoded._id }).select("-password");

		const user = await UserService.getUserById(decoded._id);

		console.log(user);
		if (!user) {
			return res.status(401).json({ error: "Invalid token" });
		}
		if (user.role == "USER") {
			return res.status(403).json({ error: "Access denied" });
		}
		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
};

const userAuth = async (req, res, next) => {
	try {
		const token = req.header("Authorization").replace("Bearer ", "");
		if (!token) {
			return res.status(401).json({ error: "No token provided" });
		}

		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		console.log(decoded);
		// const user = await User.findById({ _id: decoded._id }).select("-password");

		const user = await UserService.getUserById(decoded._id);

		console.log(user);
		if (!user) {
			return res.status(401).json({ error: "Invalid token" });
		}

		req.user = user;
		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
};

module.exports = { adminAuth, userAuth };
