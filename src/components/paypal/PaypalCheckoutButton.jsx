import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useState } from 'react'


function PaypalCheckoutButton(props) {
    const { order } = props

    const [padiFor, setPadiFor] = useState(false)
    const [error, setError] = useState(null)

    const handleApprove = (orderPaypalId) => {
      // Call Backend function to futfill order

      setPadiFor(true)
    }
    if(padiFor) {
      //Display succes message
      // alert("your payment was ")
      alert("Thank you for your purchase!")
    }
    if (error){
      // display errorMessage
    }

  return (

    <div style={{ position: 'relative' }}>
    <PayPalButtons
      style={{
        color: 'silver',
        layout: 'horizontal',
        height: 48,
        tagline: false,
        shape: 'pill',
        
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units:[
            {
              orderNumber: order._id,
              amount:{
                value: order.total
              }
            }
          ]
        })
      }}
      onClick={(data,actions) => {
        // validate on button click, client or server side
        const hasAlreadyBoughtCourse = false
          if(hasAlreadyBoughtCourse){
            setError("You already bought this course. Go to your account to view your list of courses")
            return actions.reject()
          }else{
            return actions.resolve()
          }

      }}
      onApprove={ async (data, actions) => {
        const orderPaypal = await actions.order.capture()
        console.log("orderPaypal", orderPaypal)

        handleApprove(data.orderID)
      }}
      onCancel={() => {
        //Display cancel message, modal or redirect user to cancel page o redirect to cart
      }}
      onError={(err) => {
        setError(err)
        console.log("Paypal Checkout onError", err)
      }}
    />
    <style>{`
      .paypal-buttons .paypal-button-container:not(:first-child) {
        display: none;
      }
    `}</style>
  </div>
  )
}

export default PaypalCheckoutButton 