import React from 'react'
import './Tarjetas.css'
const Carro = ({ producto, cart, setCart, productos }) => {
    const { name, presio, id, cantidad } = producto;
    const Eliminar = (id) => {
        const producto = cart.filter((producto) => producto.id !== id)
        setCart(producto)
    }
    return (
        <div className="tarjeta" >
            <div className="info-Text">
                <h5 className="Text-Button black" style={{ marginTop: 20 }}>{name}</h5>
                <p className="Text-Button black">$ <span>{presio}</span></p>
                <p className="Text-Button black">x <span>{cantidad}</span></p>

                <button className="comprar" onClick={() => Eliminar(id)}>
                    <p className="Text-Button">Eliminar</p>
                </button>
            </div>

        </div>
    )
}

export default Carro
