const mongoose = require('mongoose')
let Schema = mongoose.Schema
let GameSchema = new Schema({
    players: mongoose.Schema.Types.Array,
    locationid: mongoose.Schema.Types.ObjectId,
    skill: mongoose.Schema.Types.String,
    hostid: mongoose.Schema.Types.ObjectId,
    date: Date
})
// schema for mongoDB is defined here, providing types for each key value pair
let gameModel = mongoose.model('games', GameSchema)
module.exports = gameModel