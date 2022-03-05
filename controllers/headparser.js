/* *
*
* file controls head parser project
*/
// Dependency
const path = require('path');

// initialization of controllers container
const controllers = {};

// home
controllers.home = async (req, res) => {
    try {
        res.status(200).sendFile(path.join(__dirname, './../views/headparser.html'))
    } catch(err) {
        console.log(err);
        res.status(400).send(err)
    }
}

// whoami 
controllers.whoami = async (req, res) => {
    try {
        res.status(200).json( {
            "ipaddress": req.socket.remoteAddress,
            // "ippadress": (req.ip).replace('::ffff:', ''),
            "language": req.headers["accept-language"],
            "software": req.headers["user-agent"]
          })
    } catch(err) {
        console.log(err)
        res.status(400).send(err)
    }
}
// Export of module
module.exports = controllers;