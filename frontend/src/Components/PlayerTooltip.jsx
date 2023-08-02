import { useState } from "react"
import './index.css'
import axios from "axios"
import { Typography } from "@mui/material"

export const PlayerTooltip = ({player,children}) => {
    const [isVisible, setIsVisible] = useState(false)
    return (
    <div className="tooltip-container" onMouseEnter={()=>{setIsVisible(true)}} onMouseLeave={()=>{setIsVisible(false)}}>
        {children}
        {isVisible && 
            <div className="tooltip">
                <img src={`http://localhost:3000/image/${player.imagepath}`} width='150px' height='150px' style={{borderRadius:'2%', objectFit:'contain'}}></img>
                <Typography key={player.username} sx={{color:'rgb(255, 115, 0)'}}>MVPs:{player.mvp}</Typography>
            </div>}
    </div>
    )
}