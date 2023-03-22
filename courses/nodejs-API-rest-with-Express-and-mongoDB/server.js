const http = require("http")
const port = 3000

const rotas = {
    '/': 'Node.js Course',
    '/books': 'Joined on books page',
    'authors': 'Authors list'
}

const server = http.createServer((request, response) => {
    response.writeHead(200, { 'content-type': 'text/plain' })
    response.end(rotas[request.url])
})

server.listen(port, () => {
    console.log(`server listening on http://localhost:${port}\n`)
    console.log('Available routes:')
    console.log(`http://localhost:3000/`)
    console.log(`http://localhost:3000/books`)
    console.log(`http://localhost:3000/authors`)
})

