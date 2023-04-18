import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
    validator: (valor) => valor !== "",
    message: ({ path }) => `The following field cannot be empty: ${path}`
});