import axios from 'axios'
import './index.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import MvpVote from './MvpVote'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function MvpVoteList() {
    let navigate = useNavigate()
    let params = useParams()
    let [listState, setListState] = useState([])
    useEffect(()=>{axios.get(`http://localhost:3000/games/multiplegames/${params.gamesdata}`)
    .then((response)=>{
        let games = response.data.filter((game)=>{
            if(game.players.length === 1){
                axios.delete('http://localhost:3000/games/deletegame',{data:{gameid:game._id}})
                return false
            } return true
        })
        if(games.length === 0){navigate('/Search')}else{
        setListState(games.map((game)=>{
            return <MvpVote key={game._id} gameData={game} listState={listState} setListState={setListState}></MvpVote>
        }))
    }})
},[])

    return(
        <div className="votingdiv">
            {listState}
        </div>
    )
}