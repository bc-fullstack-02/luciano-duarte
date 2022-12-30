const router = require('express').Router()
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const authMiddleware = require('../lib/auth')

router.use(authMiddleware)
router.route('/')
    .get(async (req, res) => {
        try {
            const currentProfile = await Profile.findById(req.user.profile._id);
            const profilePosts = await Post.find({ profile: currentProfile._id }).populate('profile').populate({ path: 'comments' })
            const friendPosts = await Promise.all(
                currentProfile.following.map((friendId) => {
                    return Post.find({ profile: friendId }).populate('profile').populate({ path: 'comments' })
                }))
            res.status(200).json((profilePosts.concat(...friendPosts)).sort(function (a, b) { return new Date(b.createAt) - new Date(a.createAt) }))
        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router