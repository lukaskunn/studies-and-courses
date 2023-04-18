import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: { type: String, required: [true, "The book title is mandatory"] },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "The book author is mandatory"] },
        pages: { type: Number }
    }
);

const books = mongoose.model("books", bookSchema);

export default books;