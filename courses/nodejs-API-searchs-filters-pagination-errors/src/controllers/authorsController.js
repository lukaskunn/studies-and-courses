import mongoose from "mongoose";
import authors from "../models/Author.js";

class AuthorController {
    static listAuthors = async (req, res) => {
        try {
            const authorsResult = await authors.find();
            res.status(200).json(authorsResult);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    };

    static getAuthorById = async (req, res) => {
        const { id } = req.params;

        try {
            const authorsResult = await authors.findById(id);
            if (authorsResult !== null) {
                res.status(200).send(authorsResult);
            } else {
                res.status(404).send({ message: "Author Id not found." });
            }
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                res.status(400).send({ message: "One or more sent data are incorrectly." });
            } else {
                res.status(500).send({ message: "Internal Server Error." });
            }
        }
    };

    static registerAuthor = async (req, res) => {
        let author = new authors(req.body);

        try {
            const authorsResult = await author.save();
            res.status(201).send(authorsResult);
        } catch (error) {
            res.status(500).send({ message: `${error.message} - Error while register a new author in database` });
        }
    };

    static updateAuthor = async (req, res) => {
        const { id } = req.params;

        try {
            const authorsResult = await authors.findByIdAndUpdate(id, { $set: req.body });
            res.status(200).send({ message: "Author updated successfully!", author: authorsResult });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };

    static deleteAuthor = async (req, res) => {
        const { id } = req.params;

        try {
            await authors.findByIdAndDelete(id);
            res.status(200).send({ message: "Author deleted successfully!" });
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    };
}

export default AuthorController;

