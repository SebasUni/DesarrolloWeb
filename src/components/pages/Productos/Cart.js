import React from 'react'
import Productos from '../../Carro'
import "./carrito.css"
const Cart = ({cart , setCart,cantidad}) => {
    return (
        <div className="Contenedor">
            <div className="separador"> </div>
            <h3 className="Titulo_producto">Carrito</h3>
            <div className="separador"> </div>
            {cart.length === 0 ? (<p></p>): (
                cart.map((producto=><Productos
                key={producto.id}
                producto={producto}
                cart={cart}
                setCart={setCart}
                />))
            ) }
            </div>
    )
}
export default Cart;
