const path = require('path')
const fs = require('fs')

const express = require('express')
const app = express()

app.get('/', function (req, res) {
    console.log(req.headers)
    const content = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8')
    res.send(content)
})

app.listen(3000);
console.log ('server rodando.')