import React,{useEffect, useState, useRef}from 'react'
import {TableContainer, Table, TableHead,TableBody, TableCell, TableRow} from '@material-ui/core'
import './carrito.css'
import Paypal_Check from './Paypal_Check'
import {PDFExport} from '@progress/kendo-react-pdf'
import { onAuthStateChanged, } from "firebase/auth";

function Factura(props) {

  const [total, setTotal]=useState(0);
  const cart=props !== null ? props.location.data.cart : props
  useEffect(() => {
    const handlesumar = () => {
      const sumar = cart.map((saldo) => parseFloat(saldo.presio *saldo.cantidad))
        .reduce((previous, current) => {
          return previous + current;
        }, 0);
      setTotal(sumar);
    };
    handlesumar();
  });
  const pdfExportComponent = useRef(null)
    return (
      <div >
      <PDFExport ref={pdfExportComponent} paperSize="A4">
        <div className="container">
            <h1 className="Titulo-factura">Factura</h1>
            <TableContainer className="factura">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Cantidad</TableCell>
                    <TableCell>Presio</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cart.map(celda =>(
                    <TableRow>
    <                   TableCell>{celda.name}</TableCell>
                        <TableCell>{celda.cantidad}</TableCell>
                        <TableCell>{celda.presio * celda.cantidad}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
    <                   TableCell>Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{total}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <div className="pagar">
            <Paypal_Check order={cart} total={total} pdfExportComponent={pdfExportComponent}/>
            </div>
        </div>
        </PDFExport>
      </div>
    )
}

export default Factura