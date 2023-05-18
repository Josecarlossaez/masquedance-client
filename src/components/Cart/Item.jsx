import React from 'react'
import "../../css/Cart/item.css"


function Item(props) {
    const { name, description, size, price, stock, cantidad, picture} = props
  return (
    <div className='item'>
        <div>
            <img src={picture} alt="pic" />
        </div>
        <div>
            <h1>{name}</h1>
            <h2>Precio: {price}</h2>
            <h2>Talla: {size}</h2>
            

        </div>
    </div>
  )
}

export default Item