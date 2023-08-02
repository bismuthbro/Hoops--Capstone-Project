import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App.jsx'
import './index.css'
import GamesList from './Components/GamesList.jsx'
import AddGame from './Components/AddGame.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CourtSearch from './Components/CourtSearch.jsx'
import { Signup } from './Components/Signup.jsx'
import { Authcontext } from './Context/Authcontext.js'
import { Login } from './Components/Login.jsx'
import { Dashboard } from './Components/Dashboard.jsx'
import AddCourt from './Components/AddCourt.jsx'
import MvpVoteList from './Components/MvpVoteList.jsx'
function Main(){
  const [userData, setUserData] = useState(null)
  return(
  <>
  <React.StrictMode>
  <Dashboard></Dashboard>
  <Authcontext.Provider value={{userData,setUserData}}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<App/>}>
      <Route path= '/Search' element={<CourtSearch/>} index></Route>
      <Route path='/Games/:location'element={<GamesList/>}></Route>
      <Route path='/Add' element={<AddGame/>}></Route>
      <Route path='/Addlocation' element={<AddCourt/>}></Route>
      <Route path='/Vote/:gamesdata' element={<MvpVoteList/>}></Route>
      </Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
    </Routes>
  </BrowserRouter> 
  </Authcontext.Provider>
  </React.StrictMode>
  </>
  )
}
ReactDOM.createRoot(document.getElementById('root')).render(
<Main></Main>
)
