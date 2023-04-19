import express from "express";
import BookController from "../controllers/booksController.js";
import pagination from "../middlewares/pagination.js";

const booksRouter = express.Router();

booksRouter
    .get("/books", BookController.listBooks, pagination)
    .get("/books/search", BookController.listBooksByFilter, pagination)
    .get("/books/:id", BookController.getBookById)
    .post("/books", BookController.registerBook)
    .put("/books/:id", BookController.updateBook)
    .delete("/books/:id", BookController.deleteBook);


export default booksRouter;
