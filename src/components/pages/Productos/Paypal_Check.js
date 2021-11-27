import React, { useState } from 'react'
import ReactDOM from "react-dom"
import { projectFirestore as db } from '../../firebase/config'
import { doc, addDoc, collection } from "firebase/firestore";
import { auth } from '../../firebase/config'
import { onAuthStateChanged } from "firebase/auth";
import emailjs from 'emailjs-com';
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Paypal_Check = ({ order, total, pdfExportComponent }) => {
  const [user, setUser] = useState({})
  const pdf=pdfExportComponent
  console.log(pdf)
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total
          },
          description: 'Compra en aluminos sas',
          custom: order.customer || '',
          item_list: {
            items: order.map((item) => (
              item.name
            ))
          }
        },
      ],
    });
  }
  const registro = async () => {
    console.log(user.uid);
    let fecha = new Date
    try {
      await addDoc(collection(db, "factura"), {
        id: user.uid,
        total: total,
        producto: order.map((item) => (
          item.name
        )),
        cantidad: order.map((item) => (
          item.cantidad
        )),
        valor: order.map((item) => (
          item.precio
        )),
        fecha: fecha
      });
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }

  }
  const sendEmail = () => {
    var templateParams = {
      emaildestino: localStorage.getItem("email"),
      subject: 'Factura Aluminios Joal',
      mensaje: order.map((item) => (
        "Nombre del producto: " + item.name + " Cantidad: " + item.cantidad + " precio x unidad: " + item.precio + "USD \n"
      )),
      total:total
    };


    emailjs.send('service_n7lwv3n', 'template_t4i8t9h', templateParams, 'user_4kjYwhFJbiGpFOvJbimkC')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  };
  const onApprove = (data, actions) => {
    sendEmail()
    registro()

    return actions.order.capture();
  };
  return (
    <div>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
      <button onClick={sendEmail}>aa</button>
    </div>
  )
};

export default Paypal_Check
