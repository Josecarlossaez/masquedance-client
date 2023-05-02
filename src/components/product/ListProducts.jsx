import React from 'react'
// CSS
import "../../css/product/list-products.css"

// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
            return(
                <div className='product-box' key={eachProduct._id}>
                <div>
                <img src={eachProduct.picture} alt="picture" className='image-product'/>
                </div>
                <div>
                 <h3>{eachProduct.name}</h3>
                 <h4>{eachProduct.description}</h4>
                 <h4>{eachProduct.price}€</h4>
                </div>
                </div>
            )
        })
      }

   </div>
   </div>
  )
}

export default ListProducts