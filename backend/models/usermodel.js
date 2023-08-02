const mongoose = require('mongoose')
let Schema = mongoose.Schema
let UserSchema = new Schema({
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    imagepath: mongoose.Schema.Types.String,
    mvp: {
        type:mongoose.Schema.Types.Number,
        default: 0
    }
})
//schema for mongoDB is defined here, providing types for each key value pair
let userModel = mongoose.model('users', UserSchema)
module.exports = userModel