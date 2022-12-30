const createError = require('http-errors')
const express = require('express')
const router = express.Router()
const {Profile, Connection} = require('../models')

router
  .route('/')
  .all((req, res, next) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )

  .get((req, res, next) => Promise.resolve()
    .then(() => Profile.find({}))
    .then((data) => res.status(200).json(data))
    .catch(err => next(err))
  )

router
 .param('id', (req, res, next, id) => Promise.resolve()
   .then(() => Connection.then())
   .then(() => next())
   .catch(err => next(err))
 )
 .route('/search')

  .get((req, res, next) => Promise.resolve()
    .then(() => Profile.find({$text: {$search: `${req.query.q}`}}, {score: {$meta: 'textScore'}}).sort({score: {$meta: 'textScore'}}))
    .then((data) => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err)))
  
router
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  .route('/:id')

 .get((req, res, next) => Promise.resolve()
    .then(() => Profile.findById(req.params.id).populate(['following', 'followers']))
    .then((data) => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err)))
  
router
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  .route('/:id/follow')

  .post((req, res, next) => Promise.resolve()
    .then(() => Profile.findOneAndUpdate({_id: req.params.id}, {$push: {followers: req.user.profile._id}}))
    .then(() => Profile.findOneAndUpdate({_id: req.user.profile.id}, {$push: {following: req.params.id}}))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))
  
module.exports = router