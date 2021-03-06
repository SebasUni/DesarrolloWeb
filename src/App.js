import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import PiePagina from './components/PiePagina';
import {Redirect} from'react-router-dom';
import PrivatePagina from './routes/PrivateRoute';
import Home from './components/pages/HomePage/Home';
import PublicRoute from './routes/PublicRouter';
import QuienesSomos from './components/pages/QuienesSomos/QuienesSomos';
import Paypal_Check from './components/pages/Productos/Paypal_Check'
import Factura from './components/pages/Productos/Factura'
import {Productos} from './components/pages/Productos/Productos'
import {Login} from './components/pages/Login/Login'
import Informacion from './components/pages/Informacion/Informacion'
import ActualizacionProductos from './components/pages/Informacion/ActualizacionProductos';
function App(props) {
  const ver =()=>{
    console.log(props.path === "/" ||props.path === "/Quienes-Somos" || props.path === "/sign-up" )
    console.log(props.path )
    return(props.path === "/" ||props.path === "/Quienes-Somos" || props.path === "/sign-up" )
  }
  return (
    <div>
          <Navbar />
          <PublicRoute path="/" exact component={Home}/>
          <PublicRoute path="/Quienes-Somos" component={QuienesSomos}/>
          <PublicRoute path="/Productos" component={Productos}/>
          <PrivatePagina path="/Paypal_Check" component={Paypal_Check}/>
          <PrivatePagina path="/Factura" component={Factura}/>
          <PublicRoute path="/sign-up" component={Login}/>
          <PrivatePagina path="/Actua-prod" component={ActualizacionProductos}/>
          <PrivatePagina path="/Informacion" component={Informacion}/>
          <PiePagina />
         
          {/* <Redirect path="/" component={Home}/>  */}
    </div>
  );
}

export default App;
