import { Grid } from '@mui/material'
import {Game} from './Game'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function GamesList() {
    let params = useParams()
    let [listState, setListState] = useState([])
    useEffect(()=>{axios.get(`http://localhost:3000/games/${params.location}`)
    .then((res)=>{
        axios.get(`http://localhost:3000/locations/specificlocation/${params.location}`)
        .then((response)=>{
            const locationImg = response.data.imageurl
            const locationName = response.data.name
            let filteredList = res.data.filter((game) => game.locationid === params.location)
            let ListOfGames = filteredList.map((game)=> (<Grid item xs={12} sm={6} md={3} key={game._id}><Game {...game} key={game._id} locationImg={locationImg} locationName={locationName}></Game></Grid>))
            setListState(ListOfGames)
        })
    })},[])
    return(
        <>
        <Grid container spacing={1.8} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
        {listState} 
        </Grid>
        </>
    )
}