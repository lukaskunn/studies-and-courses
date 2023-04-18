import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorHandling from "./middlewares/errorHandling.js";
import manipulative404 from "./middlewares/manipulative404.js";

db.on("error", console.log.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Database connection finished successfully!");
});

const app = express();
app.use(express.json());

routes(app);

app.use(manipulative404);

// eslint-disable-next-line no-unused-vars
app.use(errorHandling);

export default app;