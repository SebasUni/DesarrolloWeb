import React from 'react';
import './HeroSection.css';
import { Button } from './Button';
import { Link } from 'react-router-dom';

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
                <p className={lightText ?'descripcion':'descripcion dark'}>
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
                {botton ?<Link to={path}>
                  <Button buttonSize='btn--wide' buttonColor='red'>
                    {buttonLabel}
                  </Button>
                </Link> : ""}
              </div>
            </div>
            <div className='col'>
              <div className='home__hero-img-wrapper'>
                <img src={img} alt={alt} className='home__hero-img' />
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
