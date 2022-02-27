/* 
*
*configuration file for mongodb
*
*/

// dependencies
const mongoose = require('mongoose');

const url = process.env.MONGO_URI;


const  connet = async() => {
    return await mongoose.connect(url)
        .then(() => {
            console.log('connected successfully')
        })
        .catch(err => console.log('Error in Mongodb connection'))
}

module.exports = connet;