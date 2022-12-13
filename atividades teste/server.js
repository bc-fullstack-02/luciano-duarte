const http = require("http");

const server = http.createServer((req,res) => {
    if (req.url === '/'){
        console.log(req.headers)
        res.write('hello from server')
        res.end()
    }
});

server.on('connetcion', (Stream) => {
    console.log('some one connected')

});

app.listen(4000, () => {
    console.log("Servidor está rodando em http://localhost:2000")
});