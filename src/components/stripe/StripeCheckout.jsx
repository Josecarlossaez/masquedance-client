import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckoutForm from './StripeCheckoutForm'
import "../../css/stripe/stripeCheckout.css"

const stripePromise = loadStripe("pk_test_51NEqgXHRBFTe2EWnZBsbbAOOYKklZnmtAEgxBtfUYVOB4NOA2pREMbM99GugYyTMRFZQqEdwggf2rKuiIiehgdRE00rFZ0ACxf")

function StripeCheckout(props) {
  const {setErrorMessage} = props
  return (
    <div className='stripe-container'>
         
   <Elements stripe={stripePromise}>
    <StripeCheckoutForm newOrder={props} setErrorMessage={setErrorMessage}/>
   </Elements>
    </div>

  )
}

export default StripeCheckout