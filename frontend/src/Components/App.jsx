import { useContext } from 'react'
import './index.css'
import { Dashboard } from './Dashboard'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Authcontext } from '../Context/Authcontext'
import axios from 'axios'
import backgroundImg from '../assets/streetball1.png'

function App() {
  const navigate = useNavigate()
  const {userData} = useContext(Authcontext)
  useEffect( ()=>{
    if(!userData){
      navigate('/Login')
    }else{
      axios.get(`http://localhost:3000/games/vote/${userData.username}`)
      .then((res)=>{if(res.data.length != 0){
        navigate(`/Vote/${JSON.stringify(res.data)}`)
      }})
    }
  },[userData])
  return (
    <>
      <div className='backgroundDiv' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: '93vh', width:'98vw', padding:'1vw',backgroundImage:`url(${backgroundImg})`,backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center' }}>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
