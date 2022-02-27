const mongoose = require('mongoose');
const {Schema} = mongoose;

const shortUrlSchema = new Schema({
    original_url : String, 
    short_url : String,
  })
  
  module.exports = mongoose.model('shorturl', shortUrlSchema)