import { Button, FormControl, Typography } from "@mui/material"
import { RadioGroup } from "@mui/material"
import { FormControlLabel } from "@mui/material"
import axios from "axios"
import { useContext } from "react"
import { Authcontext } from "../Context/Authcontext"
import { useNavigate } from "react-router-dom"
import {Radio} from "@mui/material"

export default function MvpVote(props) {
    const gameDate = new Date(props.gameData.date)
    const parsedgameDate = gameDate.getDate() + '/' + gameDate.getMonth() + '/' + gameDate.getFullYear() + ' '+ 'at ' + gameDate.getHours() + ':' + gameDate.getMinutes()
    const navigate = useNavigate()
    const {userData} = useContext(Authcontext)
    function handleSubmit(e){
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        axios.put('http://localhost:3000/games/updatemvps', {votingusername:userData.username,selectedusername:data.vote,gameid:props.gameData._id})
        .then(()=>{
            if(props.listState.length > 1){props.setListState(props.listState.filter(
            (game)=>{
                return game != props.gameData._id
            }
        ))}else {
            navigate('/Search')}})
    } 
    return(
    <form onSubmit={handleSubmit}>
    <Typography>Vote for the MVP of your game on {parsedgameDate} !</Typography>
    <FormControl>
    <RadioGroup defaultValue={null} name="vote" row>
        {props.gameData.players.map((player)=>{
            return (
            <div key={player.username} style={{display:"flex",flexDirection:"column", marginRight:"0.5vw"}}>
            <img src={`http://localhost:3000/image/${player.imagepath}`} width='150' height='150' style={{borderRadius:'2%', border:'3px solid white'}}></img>
            <FormControlLabel value={player.username} control={<Radio sx={{'&.Mui-checked': {color: 'rgba(255, 104, 3,0.9)'}}}/>} label={player.username} />
            </div>
            )
        })}
    </RadioGroup>
    <Button type="submit" variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh', width:'10vw', display:"flex", alignSelf:'center',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Vote!</Button>
    </FormControl>
    </form>
    )
}