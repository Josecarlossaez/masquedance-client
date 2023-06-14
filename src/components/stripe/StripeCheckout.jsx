import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckoutForm from './StripeCheckoutForm'
import "../../css/stripe/stripeCheckout.css"

const stripePromise = loadStripe("pk_test_51NEqgXHRBFTe2EWnZBsbbAOOYKklZnmtAEgxBtfUYVOB4NOA2pREMbM99GugYyTMRFZQqEdwggf2rKuiIiehgdRE00rFZ0ACxf")

function StripeCheckout(props) {
  return (
    <div className='stripe-container'>
         <h1>StripeCheckout</h1>
   <Elements stripe={stripePromise}>
    <StripeCheckoutForm orderToStripe={props}/>
   </Elements>
    </div>

  )
}

export default StripeCheckout