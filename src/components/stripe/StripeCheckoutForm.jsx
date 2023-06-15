import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../css/stripe/stripeCheckoutForm.css";
import { stripePaymentService } from "../../services/stripe.services";
import { createOrderService } from "../../services/order.services";

function StripeCheckoutForm(props) {
    const navigate = useNavigate()
    
    const { total , name } = props.newOrder.newOrder
    const {newOrder} = props.newOrder
    const {setErrorMessage} = props

    console.log("props en StripeCheckoutForm",props);
    const amount = total * 100;

    
    
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    if(newOrder.address === "" || newOrder.name === "" || newOrder.province === "" || newOrder.town === "" || newOrder.country === "" || newOrder.cp === ""){
      setErrorMessage("Debe rellenar todos los campos")
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if(paymentMethod === undefined){
      setErrorMessage("Introduce los datos de la tarjeta de crédito correctamente")
      return
    }
    if(!error){
        const { id } = paymentMethod;
        console.log(id);
        console.log(amount);
        try {
            const { data } = await stripePaymentService(id, amount, name)
            console.log("data",data);
            elements.getElement(CardElement).clear()
        } catch (error) {
            console.log(error)
            return
        }
        
    }
    try {
      await createOrderService(newOrder)
      navigate("/")
      
    } catch (error) {
      console.log(error)
    }

  };
  return (
    <form onSubmit={handleSubmit} className="form">
      <CardElement className="stripe-element" />
      <button className="buy">Comprar</button>
    </form> 
  );
}

export default StripeCheckoutForm;
