// initialization of controller container
const controller = {};
const path = require('path');

// timestamp home
controller.home = async (req, res, next) => {
    try {
        res.status(200).sendFile(path.join(__dirname,  './../views/timestamp.html'));
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

// in no parameter sent
controller.noTime = async (req, res) => {
    const now = new Date()
    try{
        res.status(200).json({
            "unix": now.getTime(),
            "utc": now.toUTCString()
        })
    } catch (err) {
        console.log(err)
        res.status(400).res.send(err)
    }
  }

controller.time = async (req, res) => {
    let dateString = req.params.data_string;
    dateString = dateString.replace(':', '')
    const passInValue = new Date(dateString)

    try {
        if(parseInt(dateString) > 10000) {
            const parsedDigit = parseInt(dateString);
            const date = new Date(parsedDigit)
            res.json({
              "unix": date.getTime(),
              "utc": date.toUTCString()
            })
          } else if(passInValue !== "Invalid Date") {
            res.status(200).json({"unix": passInValue.getTime(),"utc": passInValue.toUTCString()}) 
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : "Invalid Date" })
    }
}  
    

module.exports = controller;