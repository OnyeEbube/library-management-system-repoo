const Book = require("../models/books.model.js");
const { BookService } = require("../services/books.service.js");
const BookController = {};

BookController.getBooks = async (req, res) => {
	try {
		const books = await BookService.findAll({});
		if (!books) {
			res.status(400).json({ error: "No books have been added" });
		}
		res.status(200).json(books);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

BookController.getBook = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await BookService.findById(id);
		if (!book) {
			res.status(400).json({ error: "Book does not exist" });
		}
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json(error);
	}
};

BookController.createBook = async (req, res) => {
	try {
		const { title } = req.body;
		const existingBook = await BookService.findOne({ title: title });
		if (existingBook) {
			res.status(400).json({ error: "Book already exists" });
		}
		const book = await BookService.createBook(req.body);
		res.status(200).json(book);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

BookController.updateBook = async (req, res) => {
	try {
		const { id } = req.params;
		const book = await BookService.findById(id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		const updatedBook = await BookService.updateBook(id, req.body);
		res.status(200).json(updatedBook);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

BookController.deleteBook = async (req, res) => {
	try {
		const { id } = req.params;

		const book = await BookService.findById(id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		const deletedBook = await BookService.deleteBook(id);
		res.status(200).json({ deletedBook, message: "Book deleted Successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = {
	BookController,
};
