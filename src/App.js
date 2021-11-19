import './App.css';
import Navbar from './components/Navbar';
import PiePagina from './components/PiePagina';
import { BrowserRouter as Router, Switch,  Route } from 
'react-router-dom';
import Home from './components/pages/HomePage/Home';

import QuienesSomos from './components/pages/QuienesSomos/QuienesSomos';
import Paypal_Check from './components/pages/Productos/Paypal_Check'
import Factura from './components/pages/Productos/Factura'
import {Productos} from './components/pages/Productos/Productos'
import {Login} from './components/pages/Login/Login'



function App() {
  return (
    <Router>
      <Navbar />
      
      <Switch>
        <Route path="/" exact component={Home}/>
       
        <Route path="/Quienes-Somos" component={QuienesSomos}/>
        <Route path="/Productos" component={Productos}/>
        <Route path="/Paypal_Check" component={Paypal_Check}/>
        <Route path="/Factura" component={Factura}/>
        <Route path="/sign-up" component={Login}/>
        
      </Switch>
      <PiePagina />
    </Router>
  );
}

export default App;
