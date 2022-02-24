require('dotenv').config()

const express = require('express')
const cors = require('cors')
const timestamp = require('./routes/timeStamp')
const home = require('./controllers')

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(cors())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.use('/api', timestamp)

app.get('/', home)



const listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + PORT);
});