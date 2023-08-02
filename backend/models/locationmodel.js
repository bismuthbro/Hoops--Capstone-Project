const mongoose = require('mongoose')
let Schema = mongoose.Schema
let LocationSchema = new Schema({
    name: mongoose.Schema.Types.String,
    imageurl: mongoose.Schema.Types.String,
})
//schema for mongoDB is defined here, providing types for each key value pair
let locationModel = mongoose.model('locations', LocationSchema)
module.exports = locationModel