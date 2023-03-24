import express from "express";
import BookController from "../controllers/booksController.js";

const booksRouter = express.Router()

booksRouter
    .get("/books", BookController.listBooks)
    .get('/books/search', BookController.listBooksByAuthor)
    .get("/books/:id", BookController.getBookById)
    .post('/books', BookController.registerBook)
    .put('/books/:id', BookController.updateBook)
    .delete('/books/:id', BookController.deleteBook)


export default booksRouter
