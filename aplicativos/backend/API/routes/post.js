const createError = require('http-errors')
const express = require('express') 
const router = express.Router()
const upload = require('../lib/upload')

const {Post, Connection} = require('../models')

router
  .route('/')
  .all((req, res, next) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )

  .get((req, res, next) => Promise.resolve()
    .then(() => Post.find({ user: req.user.profile._id}).populate('comments').populate('profile'))
    .then((data) => res.status(200).json(data))
    .catch(err => next(err))
  )

  .post(upload.concat([(req, res, next) => Promise.resolve()
    .then(() => new Post({...req.body, profile: req.user.profile._id}).save())
    .then(args => req.publish('post', req.user.profile.followers, args))
    .then((data) => res.status(201).json(data))
    .catch(err => next(err))]))

router
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  .route('/:id')

  .get((req, res, next) => Promise.resolve()
    .then(() => Post.findById(req.params.id).populate('profile').populate({path: 'comments', populate:{path: 'profile'}}))
    .then((data) => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err)))

  .put((req, res, next) => Promise.resolve()
    .then(() => Post.findByIdAndUpdate(req.params.id, {...req.body, updateAt: Date.now()}, {runValidators: true}))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

  .delete((req, res, next) => Promise.resolve()
    .then(() => Post.deleteOne({_id: req.params.id}))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

router
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  .route('/:id/like')

  .post((req, res, next) => Promise.resolve()
    .then(() => Post.findOneAndUpdate({_id: req.params.id}, {$addToSet: {likes: req.user.profile._id}}))
    .then(args => req.publish('post-like', [args.profile], args))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

router
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  .route('/:id/unlike')

  .post((req, res, next) => Promise.resolve()
    .then(() => Post.findOneAndUpdate({_id: req.params.id}, {$pull: {likes: req.user.profile._id}}))
    .then(args => req.publish('post-unlike', [args.profile], args))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

module.exports = router