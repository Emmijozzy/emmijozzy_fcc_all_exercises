// initialization of controller container
const controller = {};
const path = require('path');

// timestamp home
controller.home = (req, res, next) => {
    res.sendFile(path.join(__dirname,  './../views/timestamp.html'));
    // res.send('here i am ')
    // next()
}

// in no parameter sent
controller.noTime = (req, res) => {
    const now = new Date()
    res.json({
      "unix": now.getTime(),
      "utc": now.toUTCString()
    })
  }

controller.time = (req, res) => {
    let dateString = req.params.data_string;
    dateString = dateString.replace(':', '')
    const passInValue = new Date(dateString)
    
    if(parseInt(dateString) > 10000) {
      const parsedDigit = parseInt(dateString);
      const date = new Date(parsedDigit)
      res.json({
        "unix": date.getTime(),
        "utc": date.toUTCString()
      })
    }
    
    if(passInValue == "Invalid Date"){
        res.json({ error : "Invalid Date" })
    }else {
        res.json({"unix": passInValue.getTime(),"utc": passInValue.toUTCString()})
    }  
    
  }

module.exports = controller;