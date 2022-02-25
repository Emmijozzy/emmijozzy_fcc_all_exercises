/* 
*
*router for timestamp api
*
*/

// Dependencies
const express = require('express')
const router = express.Router()
const controller = require('./../controllers/timestamp.js');

// logics
// home
router.get('/timestamp', controller.home)

// no time parameter
router.get('/', controller.noTime)

//get timestamp
router.get('/:data_string', controller.time)


module.exports = router;