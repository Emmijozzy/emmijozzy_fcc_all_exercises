/* 
*
*file contains metadat route talk
*
* */

// dependencies
const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/metadata.js');
const multer  = require('multer');
const upload = multer({ dest: './uploads/' });


// logic

// home 
router.get('/metadata', controllers.home);

// fileanalyses
router.post('/fileanalyse', upload.single('upfile'), controllers.fileAnalyse)

// export of module
module.exports = router;

