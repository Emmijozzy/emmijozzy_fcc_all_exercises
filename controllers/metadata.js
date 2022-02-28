// Dependencies
const path = require('path');

// initialization of controller container
const controllers = {};

// home
controllers.home = async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, './../views/metadata.html'))
    } catch (err) {
        console.log(err);
        res.send(err)
    }
}

//file analyse 
controllers.fileAnalyse = async (req, res) => {
    try {
        res.status(200).json({
            name : req.file.originalname,
            type : req.file.mimetype,
            size : req.file.size
        })
    } catch(err) {
        console.log(err) 
        res.status(400).send(err)
    }
}



// export of controller
module.exports = controllers