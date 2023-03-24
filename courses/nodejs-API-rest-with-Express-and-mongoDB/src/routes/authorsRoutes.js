import express from "express";
import AuthorController from "../controllers/authorsController.js";

const authorsRouter = express.Router()

authorsRouter
    .get("/authors", AuthorController.listAuthors)
    .get("/authors/:id", AuthorController.getAuthorById)
    .post('/authors', AuthorController.registerAuthor)
    .put('/authors/:id', AuthorController.updateAuthor)
    .delete('/authors/:id', AuthorController.deleteAuthor)


export default authorsRouter
