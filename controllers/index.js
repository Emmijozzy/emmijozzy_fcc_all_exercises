// home of all

const path = require('path')

module.exports = (req, res) => {
    res.sendfile(path.join(__dirname, './../views/index.html'))
}