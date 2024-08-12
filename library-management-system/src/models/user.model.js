const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	resetToken: String,
	passwordResetTokenExpiryTime: {
		type: Date,
		default: () => Date.now() + 900000,
	},
	role: { type: String, enum: ["ADMIN", "USER"] },
});

userSchema.pre("save", function (next) {
	const user = this;
	bcrypt.hash(user.password, 10, function (err, hash) {
		if (err) {
			return next(err);
		}
		user.password = hash;
		next();
	});
});

const User = mongoose.model("User", userSchema);
module.exports = User;
