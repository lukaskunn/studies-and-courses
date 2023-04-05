import express from "express";
import booksRouter from "./booksRoutes.js";
import authorsRouter from "./authorsRoutes.js";

const routes = (app) => {
    app.get("/", (req, res) => {
        res.status(200).send("Node.js Course");
    });

    app.use(
        express.json(),
        booksRouter,
        authorsRouter
    );
};

export default routes;