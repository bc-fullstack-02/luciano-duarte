const createError = require('http-errors')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const {User, Connection} = require('../models')

router
  .route('/')
  .all((req, res, next) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )

router
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  .route('/me')

  .get((req, res, next) => Promise.resolve()
    .then(() => User.findById(req.user.id).populate({path: 'profile'}))
    .then((data) => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err)))

  .put((req, res, next) => Promise.resolve()
    .then(() => bcrypt.hash(req.body.password, 10))
    .then((passHashed) => {
      delete req.body.user
      req.body.password = passHashed
      req.body.updateAt = Date.now()
    })
    .then(() => User.findByIdAndUpdate(req.user.id, req.body, {runValidators: true}))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

  .delete((req, res, next) => Promise.resolve()
    .then(() => User.deleteOne({_id: req.user.id}))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))
  
module.exports = router