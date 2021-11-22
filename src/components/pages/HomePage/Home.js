import React from 'react'
import HeroSection from '../../HeroSection'
import {homeObjOne} from './Data'
//import {infop} from '../../DataPiePagina'
//import PiePagina from '../../PiePagina'
import {inf} from './Data'

function Home(props) {
    return (
        <>
            <HeroSection {...homeObjOne}/>
            <HeroSection {...inf}/>
        </>
    )
}

export default Home
