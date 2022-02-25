// dependency
const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/headparser')
// logics
// home
router.get('/headparser', controllers.home )

// whoiam
router.get('/whoami', controllers.whoami)

module.exports = router