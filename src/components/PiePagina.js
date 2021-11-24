import React, { useEffect, useState } from 'react'
import './PiePagina.css';
import { projectFirestore as db } from '../components/firebase/config';
import { collection, getDocs } from "firebase/firestore";
function PiePagina() {
    const [quotes, setQuotes] = useState([]);
    useEffect(() => {
        const obtenerDatos = async () => {
            const documents = [];
            const datos = await getDocs(collection(db, "Imagenes"));
            datos.forEach((doc) => {
                if (doc.id === "Ubicacion") {
                    documents.push({ id: doc.id, ...doc.data() });
                }
            });
            setQuotes(documents);
        }
        obtenerDatos();

    }, [])
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
                <img src={quotes.map((quote,idx)=>(
                    quote.Url
                    ))} alt={"ubicacion"} className='UbicacionImagen' />


            </div>



        </div>
    )
}

export default PiePagina
