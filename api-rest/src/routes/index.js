const postroutes = require("./post")
const express = require("express")
const routes = express.Router()
routes.use(postroutes)
module.exports = routes