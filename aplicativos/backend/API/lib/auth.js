const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader)
        return res.status(401).send({ error: 'No token provided' })
    const parts = authHeader.split(' ')
    if (!parts.length === 2)
        return res.status(401).send({ error: 'Token error' })
    const [scheme, token] = parts
    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(401).send({ error: 'Token invalid' })
        User.findById(user._id).populate('profile')
            .then(u => {
                req.user = u
                next()
            })
    })
}