import React from 'react'
import "../../css/product/details-product.css"
import { useEffect, useState } from 'react';

import { useNavigate, useParams, Link } from "react-router-dom";
// Services
import { detailsProductService } from '../../services/product.services';
import { addProductToColectionService, listColectionService } from "../../services/colection.services.js";

function DetailsProduct() {

 const {productId} = useParams();
 const navigate = useNavigate();


 // States
 const [errorMessage, setErrorMessage] = useState("");

 const [productDetails, setProductDetails] = useState()
 const [listColection, setListColection] = useState()
 const [isFetching, setIsFetching ] = useState(true)
 const [colectionId, setColectionId] = useState()
 
console.log("errorMessage",errorMessage);




 useEffect(() => {
    getData();
  }, []);
  // Get the product Details data from API

  const getData = async () => {
    try {
      const details = await detailsProductService(productId);
      const response = await listColectionService()

      setProductDetails(details.data);
      setListColection(response.data)
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

// Choose Colection
const handleColectionChange = (e) => setColectionId(e.target.value)
 
// Call Service

const handleAddToColection = async (e) => {
  e.preventDefault()
 const productId2 = {productId: productId}
 

 try {
  await addProductToColectionService(colectionId, productId2)
  navigate("/")
 } catch (error) {
  if (
    (error.response && error.response.status === 406) ||
    (error.response && error.response.status === 400)
  ) {
    setErrorMessage(error.response.data.errorMessage);
    console.log("error", error.response.data.errorMessage);
  } else {
    navigate("/error");
  }
 }


}
 


   
 if(isFetching === true){
  return <p>LOading...</p>
 }

  

  return (
      <div>
      <div>
   <h1>Product Details</h1>
      </div>
      <div className='details-container'>
      <div className='details-image'>
        <img src={productDetails?.picture} alt="" />
      </div>
      <div className='details-data'>
         <div className='details-info'>
         <h3>{productDetails.name}</h3>
         <h3>Precio: {productDetails.price}€</h3>
         <h3>Descripción del artículo: {productDetails.description}</h3>
         </div>
         {/* <div>
      <label htmlFor="quantity">Cantidad:</label>
      <select name="quantity" value={cantidad} onChange={handleCantidad}>
        {Array.from({ length:30 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>

    </div> */}
    <div className="select-option">
            <label htmlFor="Choose Colection">Elige la colección</label>

            <select onChange={handleColectionChange}>
            <option value="">nada seleccionado</option>
              {listColection.map((opt) => (
                <option key={opt._id} value={opt._id}>
                  {opt.name}
                </option>
              ))}
            </select>
          </div>
         <div>
            <button type="sumbit" onClick={handleAddToColection} className='general-btn'>
                Añadir a colección
            </button>
            {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}
         </div>
      </div>

      </div>
   </div>
  )
}

export default DetailsProduct