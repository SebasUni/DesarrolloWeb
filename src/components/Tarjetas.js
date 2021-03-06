import React, { useState } from 'react'
import './Tarjetas.css'
const Tarjetas = ({ producto, cart, setCart, productos }) => {
    const { name, precio, id } = producto;
    const [newprod, setNewprod] = useState([])
    const addProducto = (id) => {
        const producto = productos.filter((producto) => producto.id === id)
        const carrito = cart.filter((producto) => producto.id === id)
        //console.log(carrito)
        const productoCarrito = carrito.map((prod) => {
            if (prod.id === id) {
                //console.log(prod.cantidad)
                return {
                    ...prod,
                    cantidad: prod.cantidad + 1,
                }
            }
        })

        if (carrito.length === 0) {
            setCart([...cart, ...producto])

        } else {
            if (carrito[0].id === id) {
                const nuevocart = cart.filter((producto) => producto.id !== id)
                setNewprod(productoCarrito)

                setCart(nuevocart)
                setCart([...nuevocart, ...newprod])


            } else {
                setCart([...cart, ...producto])

            }
        }

    }
    const Eliminar = (id) => {
        const producto = cart.filter((producto) => producto.id !== id)
        setCart(producto)
    }
    return (

        <div className="tarjeta" >

            <img src={producto.Url} className="image" alt="..." />

            <div className="info-Text">
                <h5 className="Text-Button black">{name}</h5>
                <p className="Text-Button black">$ <span>{precio}</span></p>
                {productos ? (
                    <button className="comprar" onClick={() => addProducto(id)}>
                        <p className="Text-Button">Comprar</p>
                    </button>
                ) : (

                    <button className="comprar" onClick={() => Eliminar(id)}>
                        <p className="Text-Button">Eliminar</p>
                    </button>
                )


                }

            </div>

        </div>

    )
}

export default Tarjetas
