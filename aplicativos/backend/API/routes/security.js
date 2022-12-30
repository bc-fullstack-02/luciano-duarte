const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Profile = require('../models/Profile')

router.route('/login')

    .post(async (req, res) => {
        try {
            const user = await User.findOne({ user: req.body.user })
            !user && res.status(404).json('Incorrect username or password')
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            !validPassword && res.status(400).json('Incorrect username or password')
            const { password, ...userJWT } = user._doc
            const accessToken = jwt.sign(JSON.stringify(userJWT), `${process.env.ACCESS_TOKEN_SECRET}`)
            res.status(200).json({ accessToken })
        } catch (err) {
            res.status(500)
        }
    })

router.route('/register')


    .post(async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const newUser = new User({
                user: req.body.user,
                password: hashedPassword,
            })
            const newProfile = new Profile({
                user: newUser._id,
                name: req.body.name,
            })
            const user = await newUser.save();
            const profile = await newProfile.save();
            await User.findByIdAndUpdate(user._id, { profile })
            const { password, ...other } = user._doc
            res.status(200).json(other);
        } catch (err) {
            res.status(500).json(err)
        }
    })

module.exports = router
