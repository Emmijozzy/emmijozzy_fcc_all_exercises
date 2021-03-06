require('dotenv').config()

const express = require('express')
const cors = require('cors')
const timestamp = require('./routes/timeStamp.js')
const headparser = require('./routes/headparser.js')
const urlshortener = require('./routes/urlshortener')
const exerciseTracker = require('./routes/exercise-tracker') 
const metadata = require('./routes/metadata')
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });
const home = require('./controllers/index.js')
const mongo_connect = require('./config')
const bodyParser = require('body-parser')

const app = express()
const PORT = Number(process.env.PORT) || 3000

app.use(cors())
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use('/api' , metadata , exerciseTracker,  urlshortener, headparser, timestamp);

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  console.log(req.file)
  res.json({
    name : req.file.originalname,
    type : req.file.mimetype,
    size : req.file.size
  })
})

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