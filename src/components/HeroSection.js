import React, { useEffect, useState } from 'react';
import './HeroSection.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { projectFirestore as db } from '../components/firebase/config';
import { collection, getDocs } from "firebase/firestore";
function HeroSection({
  lightBg,    //color total
  topLine,   // titulo primario
  lightText,  //fondo del texto
  lightTextDesc,  //color del texto
  headline,    //Titulo secundario
  description, //descripcion
  buttonLabel, //nombre del boton
  img,        // la imagne
  alt,       //nombre de la imagen
  imgStart,  //ubicacion
  path,     // a donde lo quiere mandar con el boton
  botton, //si hay boton
  centrado
}) {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const obtenerDatos = async () => {
      const documents = [];
      const datos = await getDocs(collection(db, "Imagenes"));
      datos.forEach((doc) => {
        if (doc.id === img) {
          documents.push({ id: doc.id, ...doc.data() });
        }
      });
      setQuotes(documents);
    }
    obtenerDatos();

  }, [])

  return (
    <>
      <div
        className={lightBg ? 'home__hero-section' : 'home__hero-section darkBg'}
      >
        <div className='container'>
          {centrado ?
            <div className="centrado">
              <div className='top-line'>{topLine}</div>

              <h1 className={lightText ? 'heading' : 'heading dark'}>
                {headline}
              </h1>
              <p className={lightText ? 'descripcion' : 'descripcion dark'}>
                {description}
              </p>
              {botton ?
                <Link to={path}>
                  <Button buttonSize='btn--wide' buttonColor='blue'>
                    {buttonLabel}
                  </Button>
                </Link> : ""}
            </div>
            :
            <div
              className='row home__hero-row'
              style={{
                display: 'flex',
                flexDirection: imgStart === 'start' ? 'row-reverse' : 'row'
              }}>
              <div className='col'>
                <div className='home__hero-text-wrapper'>
                  <div className='top-line'>{topLine}</div>
                  <h1 className={lightText ? 'heading' : 'heading dark'}>
                    {headline}
                  </h1>
                  <p
                    className={
                      lightTextDesc
                        ? 'home__hero-subtitle'
                        : 'home__hero-subtitle dark'
                    }
                  >
                    {description}
                  </p>
                  {botton ? <Link to={path}>
                    <Button buttonSize='btn--wide' buttonColor='red'>
                      {buttonLabel}
                    </Button>
                  </Link> : ""}
                </div>
              </div>
              <div className='col'>
                <div className='home__hero-img-wrapper'>
                  <img src={quotes.map((quote,idx)=>(
                    quote.Url
                  ))} alt={alt} className='home__hero-img' />
                </div>
              </div>
            </div>
          }
        </div>


      </div>
    </>
  );
}

export default HeroSection;
