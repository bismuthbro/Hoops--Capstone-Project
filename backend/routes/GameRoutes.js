let express = require('express')
let router = express.Router()
let controller = require('../controllers/GameController.js')

router.get('/:locationId', (req,res)=>{
    controller.getGames(req,res)
})
// retrieve a game's details by id
router.get('/multiplegames/:gameids', (req,res)=>{
    controller.getSpecificGames(req,res)
}) 
// retrieve multiple games details by id
router.get('/vote/:username', (req,res)=>{
    controller.getVotingGames(req,res)
})
// games which a user needs to vote on are retrieved by user's username
router.post('/newgame', (req,res)=>{
    controller.newGame(req,res)
})
// creating a new game route
router.put('/updategame', (req,res)=>{
    controller.updateGame(req,res)
})
// updating a game for joining games
router.put('/updatemvps', (req,res)=>{
    controller.updateGameMvps(req,res)
})
// updating MVP votes for a game
router.delete('/deletegame', (req,res)=>{
    controller.deleteGame(req,res)
})
// delete a game route (to be used after MVP voting to remove past games from DB)
module.exports = router
// routes are defined here and exported to be used in server.js
// each route calls a function from the controller which has been imported