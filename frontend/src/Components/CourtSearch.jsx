import { Select,InputLabel,MenuItem,FormControl,Button, Typography} from "@mui/material"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import './index.css'
export default function CourtSearch() {
    let [menuItems, setMenuItems] = useState(null)
    useEffect(()=>{
        axios.get('http://localhost:3000/locations/')
        .then((response)=>{setMenuItems(response.data.map((location)=>{
        return(
        <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>   
        )
        }))
    })
    },[])
    // courts retrieved from database using API call and mapped to dropdown menuitems
    let [location, setLocation] = useState('')
    const navigate = useNavigate()
    function handleChange(event){
        setLocation(event.target.value)
    }
    function handleSearch(){
        navigate('/Games/'+ location)
    }
    // location is passed upon navigate as a path parameter
    return (
        <>
        <div className="searchdiv">
        <Typography sx={{marginTop:'2vh'}}>Search for a Game!</Typography>
        <FormControl sx={{width:'10vw', alignSelf:'center', marginTop:'2vh'}}>
            <InputLabel>Area</InputLabel>
                <Select labelId="AreaSelectLabel" id="AreaSelect" value={location} label="Area" onChange={handleChange} sx={{':selected':{borderColor:'rgb(255, 104, 3)'}}}>
                {menuItems}
            </Select>
        </FormControl>
        <Button onClick={handleSearch} variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Search!</Button>
        <Link to='/Add'>
        <Button variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Create a new Game</Button>
        </Link>
        </div>
        </>
    )
}