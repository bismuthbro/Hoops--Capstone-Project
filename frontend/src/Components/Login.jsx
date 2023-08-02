import './index.css'
import { useContext} from "react"
import { useNavigate } from "react-router-dom"
import { useTextInput } from "./useTextInput"
import axios from "axios"
import { Authcontext } from "../Context/Authcontext"
import { Button } from "@mui/material"
import logo from '../assets/Hoopslogo.png'
import backgroundImg from '../assets/streetball5.png'
export function Login() {
    let navigator = useNavigate()
    let {inputProps:inputProps1} = useTextInput()
    let {inputProps:inputProps2} = useTextInput()
    const {setUserData} = useContext(Authcontext)
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/users/login',{username:inputProps1.value, password:inputProps2.value})
        .then((response)=>{
            const {password,...userData} = response.data
            setUserData(userData)
            navigator('/Search')
        })
    }
    return(
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',backgroundImage:`url(${backgroundImg})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center',height: '100vh', width:'100vw', }}>
        <div className='LoginDiv'>
        <img src={logo} style={{height:'5vh',width:'5vw', objectFit:'contain'}}></img>
        <form onSubmit={handleSubmit}>
            <input {...inputProps1} placeholder='Username' className='inputtext' style={{marginTop:'2vh'}}></input>
            <br></br>
            <input {...inputProps2} type='password' placeholder='Password' className='inputtext' style={{marginTop:'2vh'}}></input>
            <br></br>
            <Button type="submit" variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Login</Button>
        </form>
        <Button onClick={()=>{navigator('/Signup/')}} variant='contained' disableElevation sx={{backgroundColor:'#242424',marginTop:'2vh',':hover':{bgcolor:'rgb(255, 104, 3)'}}}>Sign Up</Button>
        </div>
        </div>
    )
}