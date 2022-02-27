/* 
*
* file contains url shortener router
*
*/

// dependecy
const express = require('express');
const controllers = require('../controllers/urlshortener');
const router = express.Router()

// home
router.get('/urlshortener', controllers.home);

// saveurl
router.post('/shorturl', controllers.urlshortener)

// get url
router.get('/shorturl/:suffix', controllers.getUrl)
// 



module.exports = router;

// "PB-ekek3i"