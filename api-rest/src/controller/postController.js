const { post } = require("../app")
const {Post} = require("../models")

exports.list = (req,res,next) => Promise.resolve()
    .then(() => Post.find({}))
    .then((data) => res.json(data))
    .catch(err => next(err))

exports.create = (req,res,next) => Promise.resolve()
    .then(() => new Post(req.body).save())
    .then((data) => {
        res.json(data)
    })
    .catch(err => next(err))

