// Dependencies
const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/exercise-tracker');

// home
router.get('/exercise-tracker', controllers.home)

// add user
router.post('/users', controllers.postUser)

// get user
router.get('/users', controllers.getUser)

// post Exercise
router.post ('/users/:_id/exercises', controllers.postExercise)

// export of module
module.exports = router