const createError = require('http-errors')
const express = require('express')
const router = express.Router()

const {Comment, Connection, Post} = require('../models')

router
  .param('postId', (req, res, next, id) => Promise.resolve()
    .then(() => {
      res.locals.post = {id}
      next()
    })
    .catch(err => next(err))
  )
  .route('/:postId/comments')
  .all((req, res, next) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  
 .get((req, res, next) => Promise.resolve()
    .then(() => Comment.find({post: res.locals.post.id}).populate('profile'))
    .then((data) => res.status(200).json(data))
    .catch(err => next(err)))

  .post((req, res, next) => Promise.resolve()
    .then(() => new Comment(Object.assign(req.body, {post: res.locals.post.id, profile: req.user.profile._id})).save())
    .then((comment) => Post.findById(comment.post)
      .then(post => Object.assign(post, {comments: [...post.comments, comment._id]}))
      .then(post => Post.findByIdAndUpdate(comment.post, post))
      .then(args => req.publish('comment', [args.profile], args))
      .then(() => comment)
    )
    .then((data) => res.status(201).json(data))
    .catch(err => next(err)))
router
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err)))
  .route('/:postId/comments/:id')

  .get((req, res, next) => Promise.resolve()
    .then(() => Comment.findById(req.params.id).populate('profile'))
    .then((data) => data ? res.status(200).json(data) : next(createError(404)))
    .catch(err => next(err)))

  .put((req, res, next) => Promise.resolve()
    .then(() => Comment.findByIdAndUpdate(req.params.id, {...req.body, updateAt: Date.now()}, {runValidators: true}))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

  .delete((req, res, next) => Promise.resolve()
    .then(() => Comment.deleteOne({_id: req.params.id}))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

router
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  .route('/:postId/comments/:id/like')

   .post((req, res, next) => Promise.resolve()
      .then(() => Comment.findOneAndUpdate({_id: req.params.id}, {$addToSet: {likes: req.user.profile._id}}))
      .then(args => req.publish('comment-like', [args.profile], args))
      .then((data) => res.status(203).json(data))
      .catch(err => next(err)))

router 
  .param('id', (req, res, next, id) => Promise.resolve()
    .then(() => Connection.then())
    .then(() => next())
    .catch(err => next(err))
  )
  .route('/:postId/comments/:id/unlike')

  .post((req, res, next) => Promise.resolve()
    .then(() => Comment.findOneAndUpdate({_id: req.params.id}, {$pull: {likes: req.user.profile._id}}))
    .then(args => req.publish('comment-unlike', [args.profile], args))
    .then((data) => res.status(203).json(data))
    .catch(err => next(err)))

module.exports = router
