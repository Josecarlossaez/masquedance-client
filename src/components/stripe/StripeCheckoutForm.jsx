import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../css/stripe/stripeCheckoutForm.css";
import { stripePaymentService } from "../../services/stripe.services";
// Firebase Services
import { collOrders, db } from '../../firebase'
import { collection, doc, setDoc, arrayUnion, updateDoc, deleteField, getDocs } from 'firebase/firestore'

import { AuthContext } from "../../context/auth.context.js";
import { orderMailService } from "../../services/mailing.services.js"


function StripeCheckoutForm(props) {
  const navigate = useNavigate()

  const { total, name } = props.newOrder.newOrder
  const { newOrder } = props.newOrder
  const { setErrorMessage } = props

  const { user, getUserData } = useContext(AuthContext)
  const [isFetching, setIsFetching] = useState(false);



  console.log("props en StripeCheckoutForm", props);
  const amount = total * 100;



  const stripe = useStripe();
  const elements = useElements();

  const handleInfo = async () => {
    console.log("enviando mail con esta orden -->", newOrder);
    try {
      await orderMailService(newOrder)
    } catch (error) {
      console.log("error enviando el mails desde client", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newOrder.address === "" || newOrder.name === "" || newOrder.province === "" || newOrder.town === "" || newOrder.country === "" || newOrder.cp === "") {
      setErrorMessage("Debe rellenar todos los campos")
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (paymentMethod === undefined) {
      setErrorMessage("Introduce los datos de la tarjeta de crédito correctamente")
      return
    }
    if (!error) {
      const { id } = paymentMethod;
      console.log(id);
      console.log(amount);
      try {
        const { data } = await stripePaymentService(id, amount, name)
        console.log("data", data);
        elements.getElement(CardElement).clear()
      } catch (error) {
        console.log(error)
        return
      }
    }
    // Creación del número de pedido
    const currentData = new Date()
    console.log("Fecha actual", currentData);
    const year = currentData.getFullYear();
    const month = ('0' + (currentData.getMonth() + 1)).slice(-2); // Agregamos 1 porque los meses comienzan desde 0
    const day = ('0' + currentData.getDate()).slice(-2);
    const dateToOrderNumber = year + month + day + "00"
    console.log("Fecha para numero de orden", parseInt(dateToOrderNumber));

    try {
      const orderRef = collection(db, "orders")
      const newOrderRef = doc(orderRef)
      const orderDocs = []
      let orderNumber;
      setIsFetching(true)
      const querySnapshot = await getDocs(collOrders);
      console.log("querySnapshot de órdenes", querySnapshot)
      querySnapshot.forEach((doc) => {
        orderDocs.push({...doc.data()})
        
      })
      if(orderDocs.length === 0){
        orderNumber = dateToOrderNumber + "1"
      }else{
        let maxOrderNumber = "1";
        orderDocs.forEach((each)=> {
          let numeroPedido = parseInt(each.orderNumber.toString().substring(10));
          if (numeroPedido > maxOrderNumber) {
            maxOrderNumber = numeroPedido;
          }
        }) 
        orderNumber = dateToOrderNumber + maxOrderNumber 
        console.log("orderNumber antes de sumarle 1", orderNumber)
        orderNumber = parseInt(orderNumber) + 1
        console.log("orderNumber después de sumarle 1", orderNumber)
      }

      setIsFetching(false) 
  
      newOrder.id = newOrderRef.id
      newOrder.state = "pending"
      newOrder.orderNumber = orderNumber
      await setDoc(newOrderRef, newOrder)
      const userToUpdate = doc(db, "users", user.id)
      await updateDoc(userToUpdate, {
        orders: arrayUnion(newOrder)
      })

      newOrder.orderCart.forEach(async (each) => {
        console.log("each dentro de orderCheckout", each);

        if (each.contieneTallas === false) {
          let newQuantity = each.stock - each.cantidad
          const productById = doc(db, "products", each.id);
          // alert(`Actualizando producto ${each.name}, con la cantidad ${each.stock} - ${each.cantidad} ${newQuantity}`)
          await updateDoc(productById, { stock: newQuantity });

        }

        if (each.contieneTallas === true) {
          const productById = doc(db, "products", each.id);
          each.size.forEach((eachSize) => {
            if (eachSize.name === each.sizeSelected) {
              // alert(`Actualizando producto ${each.name}, con la cantidad ${eachSize.stock} - ${each.cantidad} en la talla: ${eachSize.name}`)
              eachSize.stock = eachSize.stock - each.cantidad
            }
          })

          await updateDoc(productById, { size: each.size })
          // alert(`Actualizando producto ${each.name}`)

        }
      });
      await updateDoc(userToUpdate, {
        cart: []
      })
      await orderMailService(newOrder)
      getUserData()
      navigate("/")

    } catch (error) {
      console.log(error)
    }
    if (isFetching === true) {
      return <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <CardElement className="stripe-element" id="stripe-element" />
        <button className="buy">Comprar</button>
      </form>
      {/* <button onClick={handleInfo}>Enviar mails</button> */}
    </div>

  );
}

export default StripeCheckoutForm;
