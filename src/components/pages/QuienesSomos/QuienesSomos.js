import React from 'react'
import Informacion from '../../HeroSection'
import {mision} from './Data'
import {vision} from './Data'
import {historia} from './Data'

function Servicios() {
    return (
        <>
            <Informacion {...mision}/>
            <Informacion {...vision}/>
            <Informacion {...historia}/>
        </>
    )
}

export default Servicios
