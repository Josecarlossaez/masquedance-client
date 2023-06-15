import React, { useEffect, useRef } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrderService } from "../../services/order.services";
import "../../css/paypal/paypalCheckoutButton.css"

function PaypalCheckoutButton(props) {
  const navigate = useNavigate()
  const { newOrder } = props;
  console.log("pedido.prps", newOrder);

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
 
  // Set order to send to backend
  
  const newOrderRef = useRef(newOrder);
  newOrderRef.current = newOrder;
 
useEffect(() => {

}, [paidFor])







  const handleApprove = async (orderPaypalId) => {
    // Call Backend function to futfill order

    setPaidFor(true);

  console.log("entrando en la ruta de creación de order",newOrderRef.current)
    try {
      await createOrderService(newOrderRef.current)
      navigate("/")
      
    } catch (error) {
      navigate("/error")
    }
  };
  if (paidFor) {
    //Display succes message
    // alert("your payment was ")
    alert("Thank you for your purchase!");
  }
  if (error) {
    // display errorMessage
  }

  return (
    <div>
      <div className="form-data-container">
      
      </div>

      <div style={{ position: "relative" }}>
        <PayPalButtons newOrder={newOrder} className="paypalButtons"
          style={{
            color: "silver",
            layout: "horizontal",
            height: 48,
            tagline: false,
            shape: "pill",
            
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  reference_id: "default",
                  amount: {
                    currency_code: "USD",
                    value: parseFloat(newOrderRef.current.total).toFixed(2),
                    
                  },
                },
            console.log("entrando en createOrder.current", newOrderRef.current.total),
                 
              ],
            });
          }}
          onClick={(data, actions) => {
            // validate on button click, client or server side
            const hasAlreadyBoughtCourse = false;
            if (hasAlreadyBoughtCourse) {
              setError(
                "You already bought this course. Go to your account to view your list of courses"
              );
              return actions.reject();
            } else {
              return actions.resolve();
            }
          }}
         
          onApprove={async (data, actions) => {
            const orderPaypal = await actions.order.capture();
            console.log("orderPaypal", orderPaypal);

            handleApprove(data.orderID);
          }}
          onCancel={() => {
            //Display cancel message, modal or redirect user to cancel page o redirect to cart
          }}
          onError={(err) => {
            setError(err);
            console.log("Paypal Checkout onError", err);
          }}
        />
        <style>{`
      .paypal-buttons .paypal-button-container:not(:first-child) {
        display: none;
      }
     `}</style>
      </div>
    </div>
  );
}

export default PaypalCheckoutButton;
