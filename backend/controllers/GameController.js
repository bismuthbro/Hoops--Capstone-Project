const gameModel = require('../models/gamemodel.js')
const userModel = require('../models/usermodel.js')

exports.getGames = (req,res)=>{
    gameModel.find({locationid:req.params.locationId})
    .then((response)=>{res.json(response);
    console.log(response)
})
    .catch((error)=>{res.json({error})})
}
// games retrieved by location id and sent back to frontend
exports.getSpecificGames = (req,res)=>{
    gameModel.find({_id:{$in:JSON.parse(req.params.gameids)}})
    .then((games)=>{
        res.json(games)
    })
    .catch((error)=>res.json(error))
}
// specific games retrieved by id and sent back to frontend
exports.getVotingGames = (req,res)=>{
    let today = new Date()
    gameModel.find({"players":{$elemMatch:{"username":req.params.username,"hasvoted":false}},"date":{$lt:today}}).lean()
    .then((games)=>{
        res.json(games.map((game)=>{
            return game._id
        }))
    })
    .catch((error)=>{
        res.json({error})
    })
}
// fetch details for a game that needs to be voted on by a particular user
exports.newGame = (req,res)=>{
    const {hostinfo,...gamedata} = req.body
    hostinfo.numberofvotes = 0
    hostinfo.hasvoted = false
    const players = [hostinfo]
    gamedata.players = players
    const addGame = new gameModel(gamedata)
    addGame.save()
    .then(()=>res.send('successfully created game'))
    .catch((error)=>{res.json({error})})
}
// adds details for a new game
exports.updateGame = (req,res)=>{
    gameModel.findOneAndUpdate({_id:req.query._id},{$push:{players:{username:req.query.username,imagepath:req.query.imagepath,numberofvotes:0,hasvoted:false}}})
    .then(()=>res.send('successfully updated game'))
    .catch((error)=>{res.json({error})})
}
exports.deleteGame = (req,res)=>{
    gameModel.findOneAndDelete({_id:req.body.gameid})
    .then(()=>res.send('successfully deleted game'))
    .catch((error)=>{res.json({error})})
}
// deletes a game (to be used after completion of MVP voting)
exports.updateGameMvps = (req,res)=>{
    const votingUsername = req.body.votingusername
    const selectedUsername = req.body.selectedusername
    const gameID = req.body.gameid
    gameModel.findOne({_id: gameID}).then(game => {
        const players = game.players;
        const userVotingIndex = players.findIndex(player => player.username === votingUsername)
        const userReceivingVoteIndex = players.findIndex(player => player.username === selectedUsername)
        players[userVotingIndex].hasvoted = true;
        players[userReceivingVoteIndex].numberofvotes++;
        const notVotedPlayers = players.filter((player)=>{
            return player.hasvoted === false
        })
        if (notVotedPlayers.length === 0){
            let mostVotedPlayer = players[0].username
            let mostVotedPlayerVotes = 0
            for(const player of players){
                if(player.numberofvotes > mostVotedPlayerVotes){
                    mostVotedPlayer = player.username
                    mostVotedPlayerVotes = player.numberofvotes
                }
            }
            userModel.findOneAndUpdate({username:mostVotedPlayer}, {$inc:{mvp:1}})
            .then(()=>{
                exports.deleteGame(req,res)
            })
            .catch((error)=>{
                console.error(error)
                res.json({error})
            })
        }else{
        gameModel.findOneAndUpdate({_id: gameID}, {$set: {players: players}}).then(() => {
            res.send('success')
            console.log('Success')
        }).catch(error => {
            res.json({error})
            console.error('Error:', error)
        })}
    }).catch(error => {
        res.json({error})
        console.error('Error:', error)
    })
}
// updating number of MVP votes a user has in a specific gameas, this required a surprisingly extensive amount of code. There may be a better way to code this functionality. To be reviewed in future.