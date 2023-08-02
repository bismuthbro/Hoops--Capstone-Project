import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import Calendar from "./Calendar";
import { InputLabel, Select, MenuItem, Typography, FormControl, Tooltip} from "@mui/material";
import {Button} from "@mui/material";
import { useContext, useEffect } from "react";
import { Authcontext } from "../Context/Authcontext";
import SkillSelector from "./SkillSelector";
import HourPicker from "./HourPicker";
import './index.css'
const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{position:"absolute", left:'11.5vw',top:'53.5vh'}}><path fill="currentColor" d="M11 17h2v-6h-2v6Zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/></svg>
export default function AddGame() {
    const navigate = useNavigate()
    const {userData} = useContext(Authcontext)
    let [menuItems, setMenuItems] = useState(null)
    let [location, setLocation] = useState('')
    let [value, setValue] = useState(moment())
    let [skillValue, setSkillValue] = useState("Medium")
    useEffect(()=>{
        axios.get('http://localhost:3000/locations/')
        .then((response)=>{setMenuItems(response.data.map((location)=>{
        return(
        <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>   
        )
        }))
    })
    // courts are retrieved from database with API call and mapped to menu items of dropdown box
    },[])
    function handleLocationChange(event){
        setLocation(event.target.value)
    }
    let submitHandler = (e)=> {
        if(value.valueOf() > Date.now()){
        e.preventDefault()
        let newGameData = {
            locationid: location,
            skill:skillValue,
            hostid: userData._id,
            hostinfo:{username:userData.username,imagepath:userData.imagepath},
            date: value.valueOf() }
        axios.post('http://localhost:3000/games/newgame', newGameData)
        console.log('submitting')
        navigate(`/Games/${location}`)
        }else {alert('You must select a date in the future!')}}
    // if / else statement ensures users must select a game date in the future to avoid users creating games in the past, logging in again and voting for themselves for MVP to recieve free MVPs
    return (
        <div className="addgamediv">
            <form onSubmit={submitHandler}>
                <FormControl>
                <InputLabel sx={{marginTop:'2vh',marginLeft:'1vw'}}>Court</InputLabel>
                <Select
                    labelId="CourtSelectLabel"
                    id="CourtSelect"
                    value={location}
                    label="Court"
                    onChange={handleLocationChange}
                    sx={{marginTop:'2vh', width: '15vw', marginLeft:'1vw'}}
                    >
                {menuItems}
                </Select>
                <Calendar value={value} setValue={setValue}/>
                <HourPicker value={value} setValue={setValue}></HourPicker>
                <Typography sx={{marginTop:'2vh'}}>Skill Level</Typography><Tooltip title='Set the desired skill level for your game, this should indicate to other players how skilled you are at basketball.'>{infoIcon}</Tooltip>
                <SkillSelector state={skillValue} setState={setSkillValue}></SkillSelector>
                <Button type='submit' variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Create Game</Button>
                <Button onClick={()=>{navigate('/Addlocation')}}variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Add New Court</Button>
                </FormControl>
            </form>
        </div>
    )
}