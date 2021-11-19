import React from 'react'
import ReactDOM from "react-dom"


const PayPalButton =window.paypal.Buttons.driver("react", { React, ReactDOM });

const Paypal_Check =({order,total,pdfExportComponent})=> {
  
    const createOrder=(data, actions) =>{
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: total
                
              },
              description: 'Compra en aluminos sas',
              custom: order.customer ||'',
              item_list:{
                items: order.items
              }
              
                  
              
            },
          ],
        });
      }

    const onApprove = (data, actions) => {
      pdfExportComponent.current.save();
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
