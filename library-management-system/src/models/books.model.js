const mongoose = require("mongoose");

const BookSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Please enter book name"],
		},

		author: {
			type: String,
			required: [true, "Please enter author's name"],
		},

		description: {
			type: String,
			required: false,
		},

		quantity: {
			type: Number,
			required: true,
			default: 0,
		},

		price: {
			type: Number,
			required: true,
			default: 0,
		},

		image: {
			type: String,
			required: false,
		},

		category: {
			type: String,
			enum: ["Romance", "Fiction", "African Fiction", "Horror", "Non-fiction"],
		},
	},
	{
		timestamps: true,
	}
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
