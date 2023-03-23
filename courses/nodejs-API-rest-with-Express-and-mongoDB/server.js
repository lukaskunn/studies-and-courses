import app from "./src/app.js"

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`)
    // console.log('Available routes:')
    // console.log(`http://localhost:3000/`)
    // console.log(`http://localhost:3000/books`)
    // console.log(`http://localhost:3000/authors`)
})

