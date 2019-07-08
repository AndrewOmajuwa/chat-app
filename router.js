const { Router} = require('express')
const Messages = require('./model')

const router = new Router()

const Sse = require ('json-sse')

//Initialize the event source
const stream = new Sse()

router.get('/stream', (req, res, next) => {
    Messages
        .findAll()
        .then(messages => {
            const json = JSON.stringify(messages)
            stream.updateInit(json)
            stream.init(req, res)
        })
    
})

router.post('/messages', (req, res, next) => {
    Messages
        .create(req.body)
        .then(message => {
            Messages
                .findAll()
                .then(messages => JSON.stringify(messages))
                .then(messages => stream.updateInit(messages))
                .then(() => res.send(message))
                .catch(next)
        })
})

module.exports = router