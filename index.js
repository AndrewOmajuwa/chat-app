const express = require('express')
const Sse = require ('json-sse')
const bodyParser = require('body-parser')
const cors = require('cors')

//iniitialize the server
const app = express()

app.use(cors())

//Register body parser
const jsonParser = bodyParser.json()
app.use(jsonParser)
//read request JSPN files


//our datat store = database
const messages = [
    'Hello',
    'Can you see this?'
]

//serialize the data
const json = JSON.stringify(messages)

//Inititlaize the event source
const stream = new Sse(json)

//listen fot new clients
function onStream(req, res) {
    stream.init(req, res)
}

function onMessage(req, res){
    //destructure the user's message
    const {message}  = req.body

    //add it to the store
    messages.push(message)

    //reserialize the store
    const json= JSON.stringify(messages)

    //update the initial data
    stream.updateInit(json)

    //notify all the clients
    stream.send(json)

    //send a reponse
    return res.status(201).send(message)
}

app.get('/stream', onStream)

app.post('/message', onMessage)

//start the server
const port = process.env.PORT || 4000

function onListen() {
   
    console.log(`listening on port ${port}`)
}

app.listen(port, onListen)