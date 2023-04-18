import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: {
            type: String,
            required: [true, "The book title is mandatory"],
            enum: {
                values: ["O senhor dos aneis", "Testador de numero de paginas"], message: "The book title should be 'O senhor dos aneis' or 'Testador de numero de paginas'. Provided value: {VALUE}"
            }
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "authors", required: [true, "The book author is mandatory"] },
        pages: {
            type: Number,
            validate: {
                validator: (value) => {
                    return value >= 10 && value <= 2000;
                },
                message: "The minimum page amount should be more than 9 and the maximum page amount should be less than 2001. Provided value: {VALUE}"
            },
            // min: [10, "The minimum page amount should be more than 9. Provided value: {VALUE}"],
            // max: [2000, "The maximum page amount should be less than 2001. Provided value: {VALUE}"]
        }
    }
);

const books = mongoose.model("books", bookSchema);

export default books;