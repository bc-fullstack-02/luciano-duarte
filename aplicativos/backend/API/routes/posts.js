const router = require('express').Router()
const Post = require('../models/Post')
const upload = require('../lib/upload')
const authMiddleware = require('../lib/auth')

router.use(authMiddleware)
router.route('/')


    .get(async (req, res) => {
        try {
            const post = await Post.find().populate('profile').populate('comments')
            res.status(201).json(post)
        } catch (err) {
            res.status(500)
        }
    })


    .post(upload.concat([(async (req, res) => {
        try {
            const newPost = new Post({ ...req.body, profile: req.user.profile._id })
            const savedPost = await newPost.save()
            const rabbitPost = await req.publish('post', req.user.profile.followers, savedPost)
            res.status(200).json(savedPost)
        } catch (err) {
            res.status(500).json(err)
        }
    })]))

router.route('/:id')


    .get(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id).populate('profile').populate('comments')
            res.status(201).json(post)
        } catch (err) {
            res.status(500)
        }
    })


    .put(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if ([post.profile].toString() === [req.user.profile._id].toString()) {
                await post.updateOne({ $set: req.body });
                res.status(200).json('Post has been updated.')
            } else {
                res.status(403).json('You can only update your own posts!')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })


    .delete(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if ([post.profile].toString() === [req.user.profile._id].toString()) {
                await post.deleteOne()
                res.status(200).json('Post has been deleted.')
            } else {
                res.status(403).json('You can only delete your own posts!')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })

router.route('/:id/like')

    .post(async (req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if (!post.likes.includes(req.user.profile._id)) {
                await post.updateOne({ $push: { likes: req.user.profile._id } })
                const rabbitPost = await req.publish('post-like', [post.profile], post)
                res.status(200).json('Post has been liked.')
            } else {
                await post.updateOne({ $pull: { likes: req.user.profile._id } })
                res.status(200).json('Post has been disliked.')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router