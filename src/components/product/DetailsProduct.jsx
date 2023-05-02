import React from 'react'
import "../../css/product/details-product.css"
import { useEffect, useState } from 'react';

import { useNavigate, useParams, Link } from "react-router-dom";
// Services
import { detailsProductService } from '../../services/product.services';

function DetailsProduct() {

 const {productId} = useParams();
 const navigate = useNavigate();


 // States
 const [productDetails, setProductDetails] = useState()
 const [isFetching, setIsFetching ] = useState(true)
 const [cantidad, setCantidad] = useState(1)
  console.log("productDetails",productDetails);
 useEffect(() => {
    getData();
  }, []);
  // Get the product Details data from API
  const getData = async () => {
    try {
      const details = await detailsProductService(productId);

      setProductDetails(details.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

   // Select quantity
  const handleCantidad = (e) => setCantidad(e.target.value);
   

  if (isFetching === true) {
    return <h3>...Loading</h3>;
  }
  

  return (
      <div>
      <div>
   <h1>Product Details</h1>
      </div>
      <div className='details-container'>
      <div className='details-image'>
        <img src={productDetails.picture} alt="" />
      </div>
      <div className='details-data'>
         <div className='details-info'>
         <h3>{productDetails.name}</h3>
         <h3>Precio: {productDetails.price}€</h3>
         <h3>Descripción del artículo: {productDetails.description}</h3>
         </div>
         <div className='details-sizeList'>
             { productDetails.cantidadSizeS === 0 ?(
             <button
             className='sizes' disabled >
                <h1>S</h1>
             </button>
             ):(
                <button
             className='sizes' >
                <h1>S</h1>
             </button>

             )
             }
             { productDetails.cantidadSizeS === 0 ?(
             <button
             className='sizes' disabled >
                <h1>M</h1>
             </button>
             ):(
                <button
             className='sizes' >
                <h1>M</h1>
             </button>

             )
             }
             { productDetails.cantidadSizeS === 0 ?(
             <button
             className='sizes' disabled >
                <h1>L</h1>
             </button>
             ):(
                <button
             className='sizes' >
                <h1>L</h1>
             </button>

             )
             }
             { productDetails.cantidadSizeS === 0 ?(
             <button
             className='sizes' disabled >
                <h1>XL</h1>
             </button>
             ):(
                <button
             className='sizes' >
                <h1>XL</h1>
             </button>

             )
             }
             { productDetails.cantidadSizeS === 0 ?(
             <button
             className='sizes' disabled >
                <h1>XXL</h1>
             </button>
             ):(
                <button
             className='sizes' >
                <h1>XXL</h1>
             </button>

             )
             }
         </div>
         <div>
      <label htmlFor="quantity">Cantidad:</label>
      <select name="quantity" value={cantidad} onChange={handleCantidad}>
        {Array.from({ length:30 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
         <div>
            <button className='general-btn'>
                Añadir al carrito
            </button>
         </div>
      </div>

      </div>
   </div>
  )
}

export default DetailsProduct