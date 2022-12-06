const express = require("express")
const app = express()
const routes = require("./routes")
const helmet = require("helmet")
const bodyParser = require('body-parser')
const cors = require("cors")
const { Connection } = require('./models')
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))
app.use((req, res, next) => Connection
    .then(() => next())
    .catch(err => next(err))
)
app.use("/v1",routes)

module.exports = app