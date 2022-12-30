const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')

const swaggerUi = require('swagger-ui-express')
const createError = require('http-errors')
const defaultOptions = require('./swagger.json')

const { postRoute, commentRoute, userRoute, securityRoute, profileRoute, feedRoute } = require('./routes')
const pubsub = require('./lib/pubsub')



const urlencodedMiddleware = bodyParser.urlencoded({ extended: true })
app.use((req, res, next) => (/^multipart\//i.test(req.get('Content-Type'))) ? next() : urlencodedMiddleware(req, res, next))
app.use(bodyParser.json({ defer: true }))

app.use(logger('tiny'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(defaultOptions))

app.use('/favicon.ico', (req, res) => { 
    res.end() 
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(pubsub.pub)
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())

mongoose
    .connect(`${process.env.MONGO_URL}_${process.env.NODE_ENV}`)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((err) => console.log(err))

app.use('/v1/users', userRoute)
app.use('/v1/security', securityRoute)
app.use('/v1/posts', commentRoute)
app.use('/v1/posts', postRoute)
app.use('/v1/profiles', profileRoute)
app.use('/v1/feed', feedRoute)

app.use(function (req, res, next) {
    const err = createError(404)
    next(err)
})

app.use(function (error, req, res, next) {
    if (error.name && error.name === 'ValidationError') {
        res.status(406).json(error)
    } else if ((error.status && error.status === 404) || (error.name && error.name === 'CastError')) {
        res.status(404).json({
            url: req.originalUrl,
            error: {
                message: 'Not Found'
            }
        })
    } else if (error.code == 11000) {
        res.status(500).json({
            url: req.originalUrl,
            error: 'Duplicate key not allowed'
        })
    } else {
        res.status(error.status || 500).json({
            url: req.originalUrl,
            error: 'internal error'
        })
    }
})

module.exports = app