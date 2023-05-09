import React from 'react'
// CSS
import "../../css/product/list-products.css"

// React
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// Services

import { listProductService } from '../../services/product.services';

function ListProducts() {
  const navigate = useNavigate();

// States
const [isFetching, setIsFetching] = useState(true);
const [listProduct, setListProduct] = useState()

console.log("listproduct", listProduct);

useEffect(() => {
    getData()
}, [])

const getData = async () => {
    // Bring Products data
    try {
        const response = await listProductService();
        setListProduct(response.data)
    setIsFetching(false)
  } catch (error) {
    navigate("/error")
  }
  }
  
  if(isFetching === true) {
    return <p>...loading</p>
  }

  return (
    <div>

    
    <div>

      <h1>list product</h1>
    </div>
   <div className='products-container'>
      {
        listProduct.map((eachProduct) => {
          if(eachProduct.reference === true){
            return(
              <Link to={`/product/${eachProduct._id}/details`} className='link-box'key={eachProduct._id}>
                <div className='product-box' >
                
                <div  className='image-product'>
                <img src={eachProduct.picture} alt="pict"/>
                </div>
                <div className='product-text'>
                 <h3>{eachProduct.name}</h3>
                 {/* <h4>{eachProduct.description}</h4> */}
                 <h4>{eachProduct.price}€</h4>
                </div>
                </div>
                </Link>
            )
          }
          
        })
      }

   </div>
   </div>
  )
}

export default ListProducts