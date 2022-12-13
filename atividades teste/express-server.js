const express = require("express");

const app = express();

app.get('/', (req,res) => {
    console.log(req.headers)
    res.send('Estou rodando no server de novo.')

})

app.listen(4000, () => {
    console.log("Servidor está rodando em http://localhost:4000")
});