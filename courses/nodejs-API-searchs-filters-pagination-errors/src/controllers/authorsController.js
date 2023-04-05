import authors from "../models/Author.js";

class AuthorController {
    static listAuthors = (req, res) => {
        authors.find((err, authors) => {
            res.status(200).json(authors);
        });
    };

    static getAuthorById = (req, res) => {
        const { id } = req.params;
        authors.findById(id, (err, author) => {
            if (!err) {
                res.status(200).send(author.toJSON());
            } else {
                res.status(400).send({ message: err.message });
            }
        });
    };

    static registerAuthor = (req, res) => {
        let author = new authors(req.body);

        author.save((err) => {
            if (err) {
                res.status(500).send({ message: `${err.message} - Error while register a new author in database` });
            } else {
                res.status(201).send(author.toJSON());
            }
        });
    };

    static updateAuthor = (req, res) => {
        const { id } = req.params;
        authors.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (!err) {
                res.status(200).send({ message: "Author updated successfully!" });
            } else {
                res.status(500).send({ message: err.message });
            }
        });
    };

    static deleteAuthor = (req, res) => {
        const { id } = req.params;
        authors.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(200).send({ message: "Author deleted successfully!" });
            } else {
                res.status(500).send({ message: err.message });
            }
        });
    };
}

export default AuthorController;

