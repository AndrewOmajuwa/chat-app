const express = require('express')
const Sse = require ('json-sse')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./router')

//iniitialize the server
const app = express()

app.use(cors())

//Register body parser
const jsonParser = bodyParser.json()
app.use(jsonParser)
//read request JSPN files

app.use(router)

//start the server
const port = process.env.PORT || 4000

function onListen() {
   
    console.log(`listening on port ${port}`)
}

app.listen(port, onListen)