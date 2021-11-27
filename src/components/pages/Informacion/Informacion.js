import React, { useEffect, useState } from 'react'
import { projectFirestore as db } from '../../firebase/config';
import ReactDOM from 'react-dom'
import { collection, getDocs } from "firebase/firestore";
import { Bar, Pie } from 'react-chartjs-2';
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow } from '@material-ui/core'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'chart.js/auto'
import './Informacion.css'
const Informacion = () => {
    const [quotes, setQuotes] = useState([]);
    const ordenfecha =[];
    const [fechaInicial,setFechainicial]= useState("");
    const [fechafinal,setFechafinal]= useState("");
    const filtrado = [];
    const name = [];
    const Cant = [];
    const Valor = [];
    const totals= [];
    const fecha=[];
    const proCant=[];
    useEffect(() => {
        const obtenerDatos = async () => {
            const documents = [];
            const datos = await getDocs(collection(db, "factura"));
            datos.forEach((doc) => {
                documents.push({ id: doc.id, ...doc.data() });
                // console.log(doc.id);
            });
            //console.log(documents)
            setQuotes(documents);
        }
        obtenerDatos();
    }, [])

    const ordenar = () => {
        const item = [];
        const cantidad = []
        const precio = []
        const total = []
        quotes.forEach((doc) => {
            item.push(doc.producto);
            cantidad.push(doc.cantidad);
            precio.push(doc.valor);
            total.push(doc.total);

            // console.log(doc.id);
        });

        // console.log(item)
        //  console.log(cantidad)
        for (let x = 0; x < item.length; x++) {
            for (let y = 0; y < item[x].length; y++) {
                // console.log("estado")
                if (filtrado.length === 0) {
                    filtrado.push({ name: item[x][y], cantidad: cantidad[x][y], precio: precio[x][y] })
                } else {
                    const carrito = filtrado.filter((producto) => producto.name === item[x][y])
                    const carrito2 = filtrado.filter((producto) => producto.name !== item[x][y])
                    if (carrito.length === 0) {
                        filtrado.push({ name: item[x][y], cantidad: cantidad[x][y], precio: precio[x][y] })
                    } else {
                        const productoCarrito = carrito.map((prod) => {
                            if (prod.name === item[x][y]) {

                                return {
                                    ...prod,
                                    cantidad: prod.cantidad + 1,
                                }
                            }
                        })

                        while (filtrado.length !== 0) {

                            filtrado.pop();

                        }

                        //console.log(filtrado)
                        carrito2.map((item) => (
                            filtrado.push({ name: item.name, cantidad: item.cantidad, precio: item.precio })
                        ))
                        filtrado.push({ name: productoCarrito[0].name, cantidad: productoCarrito[0].cantidad, precio: productoCarrito[0].precio })
                    }
                    //console.log(carrito)
                }
            }
            // console.log("")
        }
        filtrado.forEach((doc) => {
            name.push(doc.name);
            Cant.push(doc.cantidad);
            Valor.push(doc.precio);
            // console.log(doc.id);
        });
        let v=0;
        total.map((item)=>(
             v=v+item
        ))
        totals.push(v)
        console.log(total)
    }

const ordenarFecha=()=>{
    const item = [];
    const cantidad = []
    const precio = []
    const total = []
    
    const prefechas=[];
    console.log()
    ordenfecha.map((item)=>{
        fecha.pop()
        proCant.pop()
     })
     quotes.forEach((doc) => {
         
         if (fechaInicial <= new Date(doc.fecha.seconds *1000) && fechafinal >= new Date(doc.fecha.seconds *1000) ) {
          
            item.push(doc.producto);
            cantidad.push(doc.cantidad);
            precio.push(doc.valor);
            total.push(doc.total);
         console.log(new Date(doc.fecha.seconds *1000))
        console.log(doc.producto)
         prefechas.push({name:doc.producto , cantidad:doc.cantidad, fecha:new Date(doc.fecha.seconds *1000).toLocaleDateString() })
        }
        
     });
    
    console.log(item)
     for (let x = 0; x < item.length; x++) {
        for (let y = 0; y < item[x].length; y++) {
            if(ordenfecha.length==0){
                ordenfecha.push({ name: item[x][y], cantidad: cantidad[x][y], precio: precio[x][y] })
                
            }else{
                const carrito = ordenfecha.filter((producto) => producto.name === item[x][y])
                    const carrito2 = ordenfecha.filter((producto) => producto.name !== item[x][y])
                    if (carrito.length === 0) {
                        ordenfecha.push({ name: item[x][y], cantidad: cantidad[x][y], precio: precio[x][y] })
                    } else {
                        const productoCarrito = carrito.map((prod) => {
                            if (prod.name === item[x][y]) {
                                console.log("aa")
                                return {
                                    ...prod,
                                    cantidad: prod.cantidad + 1,
                                }
                            }
                        })

                        while (ordenfecha.length !== 0) {

                            ordenfecha.pop();

                        }

                        //console.log(filtrado)
                        carrito2.map((item) => (
                            ordenfecha.push({ name: item.name, cantidad: item.cantidad, precio: item.precio })
                        ))
                        ordenfecha.push({ name: productoCarrito[0].name, cantidad: productoCarrito[0].cantidad, precio: productoCarrito[0].precio })
                    }
            }
        }
     }
         ordenfecha.map((item)=>{
            fecha.push(item.name)
            proCant.push(item.cantidad)
         })
        console.log(ordenfecha)
        console.log(proCant)
        
    // console.log(fecha[0])
    // console.log(fechaInicial)
    // console.log(fehcaFinal)
    ReactDOM.render(<Bar data={Registrofecha} options={opciones} />, document.getElementById('gfechab'));
    
    
   
}

    const data = {
        labels: name,
        datasets: [{
            label: "Cantidad de Productos Vendidos",
            backgroundColor: ["#cae69c",
                "#e69cbd", "#d49ce6", "#a49ce6", "#9cb7e6", "#9cd6e6",
                "#9ce6cd", "#9ce6a9", "#e1e69c", "#e6cd9c", "#e6b59c", "#e69c9c"],
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: 'yellow',
            data: Cant
        }]
    };
    const data1 = {
        labels: name,
        datasets: [{
            label: "Precio de los productos",
            backgroundColor: ["#cae69c",
                "#e69cbd", "#d49ce6", "#a49ce6", "#9cb7e6", "#9cd6e6",
                "#9ce6cd", "#9ce6a9", "#e1e69c", "#e6cd9c", "#e6b59c", "#e69c9c"],
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: 'yellow',
            data: Valor
        }]
    };
    const Registrofecha = {
        labels: fecha,
        datasets: [{
            label: "Cantidad de Productos Vendidos",
            backgroundColor: ["#cae69c",
                "#e69cbd", "#d49ce6", "#a49ce6", "#9cb7e6", "#9cd6e6",
                "#9ce6cd", "#9ce6a9", "#e1e69c", "#e6cd9c", "#e6b59c", "#e69c9c"],
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: 'yellow',
            data:proCant
        }]
    };
    const opciones = {
        maintainAspectRatip: false,
        responsive: true
    }
   
  
      
    return (
        <div>

            <div className="Conteinergrafica">
            {ordenar()}
             <h2 className="TiPr">Informe Vendido</h2>
                <TableContainer className="precioProductos">
                    <Table>
                        
                        <TableBody>
                            {name.map((item) => (
                                <TableCell>{item}</TableCell>
                            ))}
                            <TableRow>
                                {Valor.map((item) => (
                                    <TableCell>${item} USD</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                                {Cant.map((item) => (
                                    <TableCell>{item}</TableCell>
                                ))}
                            </TableRow>
                            <TableRow>
                            <TableCell>Valor total vendido </TableCell>
                            <TableCell>${totals} USD</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                
                
            </div>
            <div className="UnionGraficas">
            <div className="grafica Grow">
                    <Bar data={data} options={opciones} />
                </div>
                <div className="grafica Grow">
                    <Bar data={data1} options={opciones} />
                </div>
                
               
                <div className="grafica">
                    <p style={{marginLeft:"120px", marginTop:"10px",marginBlockEnd:"-15px"}}>Fecha inicial</p>
                <DatePicker selected={fechaInicial}  onChange={(date) => setFechainicial(date)} className="FechaOrgani"/>
                <p style={{marginLeft:"120px", marginTop:"10px",marginBlockEnd:"-10px"}}>Fecha final</p>
                <DatePicker selected={fechafinal}  onChange={(date) => setFechafinal(date)} className="FechaOrgani"/>
                <button onClick={ordenarFecha} className="Login" style={{marginLeft:"110px"}}>OK</button>
                </div>
               
                <div className="grafica " id={"gfechab"} style={{marginTop:"-50px", }}></div>
            </div>
            
        </div>
    )
}

export default Informacion
