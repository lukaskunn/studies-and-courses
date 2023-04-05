import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandling from "./middlewares/errorHandling.js";

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Database connection finished successfully!");
});

const app = express();
app.use(express.json());

routes(app);

// eslint-disable-next-line no-unused-vars
app.use(errorHandling);

export default app;