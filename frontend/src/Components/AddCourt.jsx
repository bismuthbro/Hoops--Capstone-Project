import { useTextInput } from "./useTextInput"
import axios from "axios"
import './index.css'
import { Button, Tooltip, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
const infoIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{position:"absolute"}}><path fill="currentColor" d="M11 17h2v-6h-2v6Zm1-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/></svg>
export default function AddCourt() {
    const navigate = useNavigate()
    const {inputProps:inputProps1} = useTextInput()
    const {inputProps:inputProps2} = useTextInput()
    function handleSubmit(e){
        e.preventDefault()
        let newLocationData = {
            name: inputProps1.value,
            imageurl: inputProps2.value
        }
        axios.post('http://localhost:3000/locations/newlocation',newLocationData)
        .then(()=>{navigate('/Add')})
        // handle submit navigates back to add game after new court has been added
    }
    return(
        <div className="addcourtdiv">
            <Typography sx={{marginTop:'2vh'}} >Add a new court to Hoops</Typography>
            <form onSubmit={handleSubmit}>
            <input className="inputtext" placeholder="Court Name" {...inputProps1} style={{marginTop:'2vh'}}></input>
            <br/>
            <input className="inputtext" placeholder="Court Image URL" {...inputProps2} style={{marginTop:'2vh'}}></input> <Tooltip title="Please google an image of the court you are adding and right click it, select 'Copy Image Address' and paste in this box. This means we don't need to host the image so we can save computing power and makes our website better for the planet!">{infoIcon}</Tooltip>
            <br/>
            <Button type="submit" disableElevation sx={{color:'white', backgroundColor:'#242424', marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Add Court</Button>
            </form>
        </div>
    )
}