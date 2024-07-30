const Book = require("../models/books.model.js");
//const mongoose = require("mongoose");
//const ObjectId = mongoose.Types.ObjectId;

const BookService = {};

BookService.findOne = async (filter) => {
	return await Book.findOne(filter);
};

BookService.findAll = async () => {
	return await Book.find();
};

BookService.findById = async (id) => {
	return await Book.findById(id);
};

BookService.createBook = async (data) => {
	return await Book.create(data);
};

BookService.updateBook = async (id, data) => {
	return await Book.findOneAndUpdate({ _id: id }, data, { new: true });
};

BookService.deleteBook = async (id) => {
	return await Book.findOneAndDelete({ _id: id });
};

module.exports = { BookService };
