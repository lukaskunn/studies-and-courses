import express from "express"
import books from "./models/Book.js"
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"

db.on("error", console.log.bind(console, 'Connection error'))
db.once("open", () => {
    console.log("Database connection finished successfully!")
})

const app = express()
app.use(express.json())

routes(app);

export default app