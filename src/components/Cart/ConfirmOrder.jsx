import React, { useEffect, useState } from 'react'
import "../../css/Cart/confirm-order.css"

function ConfirmOrder(props) {
  const {newOrder } = props

  const [confirmButtonView, setConfirmButtonView] = useState(true)
    useEffect(() => {
     
    }, [newOrder])
    
    console.log("neWOrder confirmOrder", newOrder);

    const subtotal = () => {
        let sum = 0;
        newOrder.orderCart.map((each) => {
           sum += each.cantidad

        })
        return sum
    }

    const handleClick = () =>{
        props.setPaymentButtonsView(true)
        setConfirmButtonView(false)
    }
    console.log(subtotal());
  return (
   <div className='confirm-order-container' id="confirm-order">
   <div>
    <h3>Subtotal{`(${subtotal()} productos)`}</h3>
   </div>
   <div>
   <table>
      <thead>
        <tr key={newOrder._id}>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Subtotal</th>
          
        </tr>
      </thead>
      <tbody >
        {newOrder.orderCart.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.cantidad}</td>
            <td>{item.price}</td>
            <td>{item.subtotal}</td>
           
          </tr>
        ))}
      </tbody>
    </table>
   </div>
   <hr />
   <div>
    <h3>Total más gastos de envío: {newOrder.total}€</h3>
   </div>
   <br />
   <div className='user-data'>
    <h4>Enviar a: {newOrder.name}</h4>
    <h4>Teléfono: {newOrder.phone}</h4>
    <h4>Dirección {newOrder.address}</h4>
    <h4>Ciudad: {newOrder.town}</h4>
    <h4>CP: {newOrder.cp}</h4>
    <h4>Provincia: {newOrder.province}</h4>
    <h4>País: {newOrder.country}</h4>
   </div>
   {confirmButtonView && 
   <div>
    <button onClick={handleClick} className='confirm-btn'>Confirmar</button>
   </div>
   }
   

   </div>
  )
}

export default ConfirmOrder