import React from 'react'
// CSS
import "../../css/product/list-products.css"

// React
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

// Services

import { listProductService } from '../../services/product.services';
import {listColectionService} from "../../services/colection.services"


function ListProducts() {
  const navigate = useNavigate();

// States
const [isFetching, setIsFetching] = useState(true);
const [listProduct, setListProduct] = useState()
const [listColection, setListColection] = useState()


useEffect(() => {
    getData()
}, [])

const getData = async () => {
    // Bring Products data
    try {
        const response = await listProductService();
        const responseColection = await listColectionService()
        setListProduct(response.data)
        setListColection(responseColection.data)
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
                 <Link to={`/product/${eachProduct._id}/details`} key={eachProduct._id}>
              <div >
                

               
                <div className='product-box' >
                
                <div  className='image-product'>
                <img src={eachProduct.picture} alt="pict"/>
                </div>
                <div className='product-text'>
                 <h3>{eachProduct.name}</h3>
                 {/* <h4>{eachProduct.description}</h4> */}
                 <h4>{eachProduct.price}€</h4>
                 <h4>Talla {eachProduct.size}</h4>
                </div>
                </div>
                {/* <div className='select-input'>
          <select onChange={handleColectionChange}>
              {listColection?.map((opt) => (
                <option key={opt._id} value={opt._id}>
                  {opt.name}
                </option>
              ))};
            </select>
          </div> */}
                
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