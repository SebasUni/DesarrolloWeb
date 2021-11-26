import React, { useState } from 'react'
import ReactDOM from "react-dom"
import { projectFirestore as db } from '../../firebase/config'
import { doc, addDoc ,collection} from "firebase/firestore";
import { auth } from '../../firebase/config'
import { onAuthStateChanged} from "firebase/auth";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

const Paypal_Check = ({ order, total, pdfExportComponent }) => {
  const [user, setUser] = useState({})
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
            items: order.map((item)=>(
              item.name
            ))
          }
        },
      ],
    });
  }
  const registro = async () => {
    console.log(user.uid);
    try {
        await addDoc(collection(db, "factura"), {
            id: user.uid,
            total:total,
            producto: order.map((item)=>(
              item.name
            )),
            cantidad:order.map((item)=>(
              item.cantidad
            )),
            valor:order.map((item)=>(
              item.precio
            ))
        });
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }

}
  const onApprove = (data, actions) => {
    pdfExportComponent.current.save();
    registro()

    return actions.order.capture();
  };
  return (
    <div>
      <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
      />
    </div>
  )
};

export default Paypal_Check
