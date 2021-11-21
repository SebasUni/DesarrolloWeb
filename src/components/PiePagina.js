import React from 'react'
import './PiePagina.css';

function PiePagina(
    {
        titulo,
        descripcion
    }
) {
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
                <img src={"http://localhost:3000/images/Ubicacion.png"} alt={"ubicacion"} className='UbicacionImagen' />


            </div>



        </div>
    )
}

export default PiePagina
