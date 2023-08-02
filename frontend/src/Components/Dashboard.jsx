import logo from '../assets/Hoopslogo.png'
import './index.css'

export function Dashboard() {
    return (
        <div className='dashboard'>
            <img src={logo} style={{ objectFit: 'contain', width:'12vw', height:'6vh'}}></img>
        </div>
    )
}