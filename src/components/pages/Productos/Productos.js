import React, { useState, useEffect } from 'react'
import { projectFirestore as db } from '../../firebase/config';
import { collection, getDocs } from "firebase/firestore";
import Tarjeta from '../../Tarjetas'
import Cart from "./Cart"
import { onAuthStateChanged, } from "firebase/auth";
import './carrito.css'
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config'

export const Productos = () => {
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = useState({})
  useEffect(() => {
    const obtenerDatos = async () => {
      const documents = [];
      const datos = await getDocs(collection(db, "Productos"));
      datos.forEach((doc) => {
        documents.push({ id: doc.id, ...doc.data(), cantidad: 1 });

        // console.log(doc.id);

      });
      //console.log(documents)
      setQuotes(documents);
    }
    obtenerDatos();
  }, [])

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);

  });
  const [cart, setCart] = useState([]);

  return (
    <div>

      <div className="container">
        <div className="separador"> </div>
        <h3 className="Titulo_producto">Productos</h3>
        <div className="separador"> </div>
        {
          quotes.map((quote, idx) => (
            <div className="lista" >
              <div >
                <Tarjeta
                  key={quote.id}
                  producto={quote}
                  cart={cart}
                  setCart={setCart}
                  productos={quotes}

                />
              </div>


            </div>

          ))

        }
      </div>



      <div className="container">

        <Cart
          id={cart.id}
          cart={cart}
          setCart={setCart}

        />
      </div>

      <div className="container">
        {user ?
          <div className="d">
            <Link to={{
              pathname: "/Factura",
              data: { cart }
            }}>
              <button className="container Irpagar">
                Terminar comprar
              </button>
            </Link>
          </div>
          : <div className="d">
            <Link to={{
              pathname: "/sign-up",

            }}>
              <button className="container Irpagar">{localStorage.setItem("Productos", cart)}
                Registarte para realizar la compra
              </button>
              {console.log(localStorage.getItem("Productos"))}
            </Link>
          </div>}







      </div>





    </div>
  )
}
