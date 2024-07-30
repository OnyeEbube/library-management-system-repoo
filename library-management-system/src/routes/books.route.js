const express = require("express");
const router = express.Router(); //;
const { BookController } = require("../controllers/books.controller.js");
const { adminAuth, userAuth } = require("../middleware/jwt.middleware.js");

//get all books
router.get("/", userAuth, BookController.getBooks);
//get a book
router.get("/:id", userAuth, BookController.getBook);
//create a book
router.post("/", adminAuth, BookController.createBook);
//update a book
router.put("/:id", adminAuth, BookController.updateBook);
//delete a book
router.delete("/:id", adminAuth, BookController.deleteBook);

module.exports = router;
