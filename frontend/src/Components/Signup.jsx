import { useContext } from "react"
import axios from "axios"
import { Authcontext } from "../Context/Authcontext"
import { Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import backgroundImg from '../assets/streetball2.png'
export function Signup() {
    const {setUserData} = useContext(Authcontext)
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())
        if(data.password === data.passwordcheck){
            axios.post('http://localhost:3000/users/newuser',formData,{
                headers: {
                    Accept:'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response)=>{
                const {password,...userData} = response.data
                setUserData(userData)
                navigate('/Search')
            })
        } else {alert('The passwords must match')}
    }
    return(
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundImage:`url(${backgroundImg})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center',height: '100vh', width:'100vw', }}>
        <div className="signupdiv">
        <form onSubmit={handleSubmit}>
            <input name="username" placeholder='Username' className='inputtext' style={{marginTop:'2vh'}}></input>
            <br/>
            <input name="password" placeholder='Password' className='inputtext' style={{marginTop:'2vh'}} type="password"></input>
            <br/>
            <input name="passwordcheck" placeholder='Repeat Password' className='inputtext' style={{marginTop:'2vh'}} type="password"></input>
            <br/>
            <Typography sx={{marginTop:'2vh'}}>Choose a Profile Image:</Typography>
            <input type="file" name="avatar" accept="image/png, image/jpeg" style={{textAlign:'center', marginTop:'2vh', marginLeft:'70px',}}></input>
            <br/>
            <Button type="submit" variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Sign Up</Button>
        </form>
        </div>
        </div>
    )
}