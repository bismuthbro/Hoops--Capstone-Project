import { Button, Typography } from "@mui/material";
import axios from "axios";
import { Authcontext } from "../Context/Authcontext"
import { useEffect, useState, useContext } from "react";
import { PlayerTooltip } from "./PlayerTooltip";
export function Game(props) {
    const [playersData, setPlayersData] = useState([])
    const {userData} = useContext(Authcontext)
    const { username,imagepath } = userData
    useEffect(()=>{
        axios.get(`http://localhost:3000/users/users/${JSON.stringify(props.players.map((player)=>{return player.username}))}`)
        .then((response)=>{
            setPlayersData(response.data)
        })
    },[])
    // users present in each game are retrieved once using useEffect with empty array for dependency
    let [hostImg, setHostImg] = useState(null)
    let [hostName, setHostName] = useState(null)
    useEffect(()=>{axios.get(`http://localhost:3000/users/user/${props.hostid}`)
    .then((response)=>{setHostImg('http://localhost:3000/image/'+ response.data.imagepath);
    setHostName(response.data.username)    
    })},[])
    // user image paths also retrieved once using useEffect with empty array for dependency
    let joinHandler = () => {
        if(playersData.findIndex((player)=>{return player.username === username}) === -1){
            axios.put(`http://localhost:3000/games/updategame/?username=${username}&_id=${props._id}&imagepath=${imagepath}`)
            .then(() => alert('You have been added to the game!'))
        } else {alert('You have already joined this game!')}
    }
    // if / else statement used to ensure users cannot join games they are already a part of
    function parseDate(datestring) {
        const date = new Date(datestring)
        return (
            date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
        )
    }
    // date is parsed from unix epoch time to 24hr time
    return (
        <div style={{ display: "flex", flexDirection: "row",  gap: '2%',backgroundColor: 'rgb(112,112,112)', borderRadius: 8, padding: '2%' }}>
            <div style={{display:'flex',flexDirection:'column'}}>
            <Typography sx={{fontSize:'0.8rem'}}>{props.locationName} </Typography>
            <img src={props.locationImg} style={{ width: '256px', height: '256px', objectFit: 'cover', borderRadius:'2%', border: '4px solid rgba(0, 0, 0, 0.5)'}}></img>
            </div>
            <div style={{flexDirection:'column'}}>
            <div style={{flexDirection:'row'}}>
            <Typography sx={{fontSize:'0.8rem'}}>Hosted By: {hostName}</Typography>
            <img src={hostImg} style={{ width: '100px', height: '100px', borderRadius:'5%', border:'4px solid rgba(0, 0, 0, 0.5)'}}></img>
            <Typography sx={{fontSize:'0.7rem'}}>Skill Level: <Typography sx={{fontSize:'0.8rem', color:'rgb(255, 115, 0)'}}>{props.skill}</Typography></Typography> 
            <Typography sx={{fontSize:'0.7rem'}}>Date: {parseDate(props.date)}</Typography>
            <Typography sx={{fontSize:'0.8rem'}}>Attending:</Typography> 
            {playersData.map((player)=>{
                return(<PlayerTooltip key={player.username} player={player}><Typography key={player.username} sx={{fontSize:'0.8rem', color:'rgb(255, 115, 0)'}}>{player.username}&nbsp;</Typography></PlayerTooltip>)
                })
            }
            </div>
                <Button onClick={()=>joinHandler()} variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Join Game!</Button>
            </div>
        </div>
    )
    // player username typography wrapped in playertooltip component so that player image and MVPs are displayed on mouse enter and removed on mouse leave
}