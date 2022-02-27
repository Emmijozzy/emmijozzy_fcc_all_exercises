require('dotenv').config()

const express = require('express')
const cors = require('cors')
const timestamp = require('./routes/timeStamp.js')
const headparser = require('./routes/headparser.js')
const urlshortener = require('./routes/urlshortener')
const home = require('./controllers/index.js')
const mongo_connect = require('./config')
const bodyParser = require('body-parser')

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use('/api', urlshortener, headparser,  timestamp);

app.get('/', home)

// urlshortener
mongo_connect()
    .then(() => {
      app.listen(PORT, function () {
        console.log('Your app is listening on port ' + PORT);
      });
    })
    .catch(err => {
      console.log(err)
    })