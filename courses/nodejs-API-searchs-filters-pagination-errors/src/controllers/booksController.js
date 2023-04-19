import { authors, books } from "../models/index.js";
import NotFoundError from "../errors/NotFoundError.js";
class BookController {
    static listBooks = async (req, res, next) => {
        try {
            const booksResult = await books.find().populate("author").exec();
            res.status(200).json(booksResult);
        } catch (error) {
            next(error);
            // res.status(500).json({ message: "Internal server error" });
        }
    };

    static getBookById = async (req, res, next) => {
        const { id } = req.params;

        try {
            const booksResult = await books.find(id).populate("author").exec();
            res.status(200).json(booksResult);
        } catch (error) {
            next(new NotFoundError("Book Id not found."));
            // res.status(400).send({ message: error.message });
        }
    };

    static registerBook = async (req, res, next) => {
        let book = new books(req.body);

        try {
            const booksResult = await book.save();
            res.status(201).send(booksResult);
        } catch (error) {
            next(error);
            // res.status(500).send({ message: `${error.message} - Error while register a new book in database` });
        }
    };

    static updateBook = async (req, res, next) => {
        const { id } = req.params;

        try {
            const booksResult = await books.findByIdAndUpdate(id, { $set: req.body });
            if (booksResult != null) {
                res.status(200).send({ message: "Book updated successfully!" });
            } else {
                next(new NotFoundError("Book Id not found."));
            }
        } catch (error) {
            next(error);
            // res.status(500).send({ message: error.message });
        }
    };

    static deleteBook = async (req, res, next) => {
        const { id } = req.params;

        try {
            const booksResult = await books.findByIdAndDelete(id);
            if (booksResult != null) {
                res.status(200).send({ message: "Book deleted successfully!" });
            } else {
                next(new NotFoundError("Book Id not found."));
            }
        } catch (error) {
            next(error);
            // res.status(500).send({ message: error.message });
        }
    };

    static listBooksByFilter = async (req, res, next) => {
        try {
            const { title, authorName, pages } = req.query;

            const titleRegex = new RegExp(title, "i");

            let search = {};

            if (title) {
                search.title = titleRegex;
            }

            if (pages) {
                search.pages = pages;
            }

            if (authorName) {
                const author = await authors.findOne({ name: authorName });

                if (author !== null) {
                    search.author = author._id;
                } else {
                    search = null;
                }
            }

            if (search !== null) {
                const booksResult = await books.find(search, {}).populate("author").exec();
                res.status(200).send(booksResult);
            } else {
                res.status(200).send([]);
            }

        } catch (error) {
            next(error);
        }
    };
}

export default BookController;

