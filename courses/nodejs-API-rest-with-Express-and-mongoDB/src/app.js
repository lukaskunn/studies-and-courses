import express from "express"

const app = express()
app.use(express.json())

const books = [
    { "id": 1, "title": "Lord of the Rings" },
    { "id": 2, "title": "The Hobbit" }
]

app.get('/', (req, res) => {
    res.status(200).send("Node.js Course")
})

app.get('/books', (req, res) => {
    res.status(200).json(books)
})

app.get('/books/:id', (req, res) => {
    let { id } = req.params
    const index = searchBook(id)
    res.send(books[index])
})

app.post('/books', (req, res) => {
    books.push(req.body);
    res.send(201).send('Book Registered successfully!')
})

app.put('/books/:id', (req, res) => {
    let { id } = req.params
    const index = searchBook(id)
    books[index].title = req.body.title
    res.send(books)
})

app.delete('/books/:id', (req, res) => {
    let { id } = req.params
    const index = searchBook(id)
    books.splice(index, 1)
    res.send(`Book number ${id} deleted successfully!`)
})

function searchBook(id) {
    return books.findIndex(book => book.id == id)
}

export default app