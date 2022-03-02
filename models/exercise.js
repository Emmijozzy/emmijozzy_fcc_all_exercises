// Depemdency
const mongoose = require('mongoose');
const {Schema} = mongoose;

const exerciseSchema = new Schema ({
    username : String,
    count : Number,
    _id : String,
    log : [{
        description : String,
        duration : Number,
        date : String
    }]
})

module.exports =  mongoose.model('exercises', exerciseSchema)