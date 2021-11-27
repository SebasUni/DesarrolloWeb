import React, { useEffect, useState } from 'react'
import './PiePagina.css';
import { projectFirestore as db } from '../components/firebase/config';
import { collection, getDocs } from "firebase/firestore";
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
const containerStyle = {
    width: '350px',
    height: '200px'
  };
  
  const center = {
    lat: 4.643085 ,
    lng: -74.196057
  };
  
function PiePagina() {
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: "AIzaSyC3SG2Ha8bFtXHN3zdx143Dgre_QEL5x7w"
    // })



    return (
        <div className='contenedor darkBg'>
            <div className="centrado izquierdo">
                <div className='titulo'>
                    ALUMINIOS JOAL
                </div>
                <div className="textoinfo">
                    Oficinas Principales
                </div>
                <div className="textoinfo">
                    <p>🗺️ Carrera 105 B Nº 56F 83 Sur barrio Bosa Santafé</p>
                    <p>📞 313 462 1012</p>
                    <div className="Redes">

                        <form action="https://www.facebook.com/Aluminios-Joal-HS-SAS-105127497651071" target="_blank">
                            <input className="face" type="image" src="images/Facebook.png" alt="face" />
                        </form>

                        <form action="https://wa.me/573134121012?text=Hola%20quisiera%20solicitar%20informacion" target="_blank">
                            <input className="face" type="image" src="images/Whatsapp.png" alt="face" />
                        </form>
                    </div>

                </div>
                {/* <img src={quotes.map((quote,idx)=>(
                    quote.Url
                    ))} alt={"ubicacion"} className='UbicacionImagen' /> */}
                {/* {isLoaded ? (
                    <div className="UbicacionImagen">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={20}
                    
                >
                    <Marker position={center}/>
                   
                    <></>
                </GoogleMap>
                    </div>
                
            ) : <></>} */}
            </div>
            


        </div>
    )
}

export default PiePagina
