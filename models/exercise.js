// Depemdency
const mongoose = require('mongoose');
const { schema } = require('./urlshortener');
const {Schema} = mongoose;

// const exerciseSchema = new Schema ({
//     username : String,
//     count : Number,
//     _id : String,
//     log : [{
//         description : String,
//         duration : Number,
//         date : String
//     }]
// })

const exerciseSchema = new Schema({
    username: String,
    description : String,
    duration: Number,
    date : String
})

module.exports =  mongoose.model('exercises', exerciseSchema)