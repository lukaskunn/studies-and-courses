import books from "../models/Book.js";

class BookController {
    static listBooks = async (req, res) => {
        try {
            const booksResult = await books.find().populate("author").exec();
            res.status(200).json(booksResult);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static getBookById = async (req, res) => {
        const { id } = req.params;

        try {
            const booksResult = await books.find(id).populate("author").exec();
            res.status(200).json(booksResult);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    };

    static registerBook = async (req, res) => {
        let book = new books(req.body);

        try {
            const booksResult = await book.save();
            res.status(201).send(booksResult);
        } catch (error) {
            res.status(500).send({ message: `${error.message} - Error while register a new book in database` });
        }
    };

    static updateBook = async (req, res) => {
        const { id } = req.params;

        try {
            await books.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).send({ message: "Book updated successfully!" });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };

    static deleteBook = async (req, res) => {
        const { id } = req.params;

        try {
            await books.findByIdAndDelete(id);
            res.status(200).send({ message: "Book deleted successfully!" });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };

    static listBooksByAuthor = async (req, res) => {
        const pages = req.query.pages;

        try {
            const booksResult = await books.find({ "pages": pages }, {}).populate("author", "name").exec();
            res.status(200).send(booksResult);
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };
}

export default BookController;

