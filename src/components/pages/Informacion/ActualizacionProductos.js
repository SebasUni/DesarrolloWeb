import React, { useState } from 'react'
import './Actualizar.css'
import { projectFirestore as db } from '../../firebase/config';
import { collection, getDocs,doc, setDoc, updateDoc, getDoc,addDoc } from "firebase/firestore";
import axios from 'axios';

const ActualizacionProductos = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [precio, setPrecio] = useState('');
   
const agregar =()=>{
      addDoc(collection(db, "Productos" ), {
        name: name,
        ulr: url,
        precio: precio
    });
}


const convertidor =(archivo)=>{
    Array.from(archivo).forEach(archivo =>{
        var reader= new FileReader();
        reader.readAsDataURL(archivo);
        reader.onload=function() {
            var base64 = reader.result
            setUrl(base64)
            //console.log(base64)
        }
    })
}

    return (
        <div className="container">
            <div className="ContainerSpur">
            <div>
                <input type="text" className="imput" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <input type="text" className="imput" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)}></input>
            </div>
            <div>
                <input type="text" className="imput" placeholder="Url" value={url} onChange={(e) => setUrl(e.target.value)}></input>
            </div>
            <div>
                <input type="file"  multiple onChange={(e)=>convertidor(e.target.files)}></input>
            </div>
            
            <button className="ButtonAgre" onClick={agregar} >agregar productos </button>

            </div>
           
        </div>
    )
}

export default ActualizacionProductos
