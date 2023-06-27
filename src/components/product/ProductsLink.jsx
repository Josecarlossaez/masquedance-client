import React from 'react'
import { Link } from 'react-router-dom'

// CSS
import "../../css/product/product-link.css"

function ProductsLink(props) {
    const {listProduct} = props
  return (
    <div className='product-link-container' >
         <div className='product-link-text'>
              <h3>Todos nuestros productos disponibles <span>onlline</span></h3>
              <h3>Aquí te presentamos nuestra novedad:</h3>
             <h2>{listProduct[listProduct.length -1].name}</h2>
         </div>
         <div>
            <Link to="/list-colections" target="_blank" className='link-twitch-link'>
            <img src={listProduct[listProduct.length -1].picture} alt="twitch-link" className='image-twitch-link'/>
        </Link>
         </div>
        
    </div>
  )
}

export default ProductsLink