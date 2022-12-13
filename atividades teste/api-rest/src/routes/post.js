const express = require("express")
const {PostController} = require("../controller")
const router = express.Router()
router
    .route("/posts")
    .get(PostController.list)
    .post(PostController.create)
module.exports = router