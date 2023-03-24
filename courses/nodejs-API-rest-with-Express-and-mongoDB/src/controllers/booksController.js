import books from "../models/Book.js";

class BookController {
    static listBooks = (req, res) => {
        books.find((err, books) => {
            res.status(200).json(books)
        })
    }

    static getBookById = (req, res) => {
        const { id } = req.params
        books.findById(id, (err, book) => {
            if (!err) {
                res.status(200).send(book.toJSON())
            } else {
                res.status(400).send({ message: err.message })
            }
        })
    }

    static registerBook = (req, res) => {
        let book = new books(req.body)

        book.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Error while register a new book in database` })
            } else {
                res.status(201).send(book.toJSON())
            }
        })
    }

    static updateBook = (req, res) => {
        const { id } = req.params
        books.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Book updated successfully!' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }

    static deleteBook = (req, res) => {
        const { id } = req.params
        books.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: 'Book deleted successfully!' })
            } else {
                res.status(500).send({ message: err.message })
            }
        })
    }
}

export default BookController

