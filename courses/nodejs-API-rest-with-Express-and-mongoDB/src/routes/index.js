import express from "express"
import booksRouter from "./booksRoutes.js"

const routes = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Node.js Course")
    })

    app.use(
        express.json(),
        booksRouter
    )
}

export default routes