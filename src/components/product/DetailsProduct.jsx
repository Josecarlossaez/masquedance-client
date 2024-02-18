import React from "react";

import "../../css/product/details-product.css";
import { useEffect, useState } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";
// Services Firebase
import { collection, getDocs,doc,getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'


import { deleteProductService } from "../../services/product.services";

function DetailsProduct() {
  const { productId } = useParams();

  const navigate = useNavigate();

  // States
  const [errorMessage, setErrorMessage] = useState("");
  const [okMessage, setOkMessage] = useState("");

  const [productDetails, setProductDetails] = useState();
  const [listColection, setListColection] = useState();
  const [isFetching, setIsFetching] = useState(true);
  const [colectionId, setColectionId] = useState();
  const [productInColection, setProductInColection] = useState();
  const [productInColectionId, setProductInColectionId] = useState();
  const [shouldRefreshPage, setShouldRefreshPage] = useState(false);

 

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      console.log("productId", productId)
      const product = doc(db, 'products', productId)
      const productById = await getDoc(product)
      setProductDetails(productById.data())
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  // REMOVE PRODUCT 
  const handleRemoveProduct = async () => {
    
    try {
      await deleteDoc(doc(db, "products", productId));
      setOkMessage("Producto Borrado Correctamente")
      setTimeout(() => {
         navigate("/list-products")
      },2000)

    } catch (error) {
      navigate("/error")
    }
   } 

  if (isFetching === true) {
    return <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="sr-only"></span>
    </div>
  </div>
  }

  return (
    <div>
      <div>
        <h1>Product Details</h1>
      </div>
      <div className="details-container">
        <div className="details-image">
          <img src={productDetails?.picture} alt="" />
        </div>
        <div className="details-data">
          <div className="details-info">
            <h3>{productDetails.name}</h3>
            <h3>Precio: {productDetails.price}€</h3>
            <h3>Descripción del artículo: {productDetails.description}</h3>
            {/* <h3>Talla: {productDetails.size}</h3> */}
            {/* <h3>Stock: {productDetails.stock}</h3> */}
            <p>id: {productDetails.id}</p>
          </div>
          {/* {!productInColection && (
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
          )} */}

          {/* {!productInColection ? (
            <div>
              <button
                type="sumbit"
                onClick={handleAddToColection}
                className="general-btn"
              >
                Añadir a colección
              </button>
              {errorMessage !== "" && (
                <p className="error-message"> * {errorMessage}</p>
              )}
              {okMessage !== "" && <p className="ok-message"> * {okMessage}</p>}
            </div>
          ) : (
            <div>
              <button
                type="sumbit"
                onClick={handleRemoveToColection}
                className="general-btn"
              >
                Eliminar de la colección
              </button>
              {errorMessage !== "" && (
                <p className="error-message"> * {errorMessage}</p>
              )}
              {okMessage !== "" && <p className="ok-message"> * {okMessage}</p>}
            </div>
          )} */}
          <div>
              <Link to={`/product/${productId}/edit`}>
            <button className="general-btn">
                Editar Producto
            </button>
              </Link>
          </div>
          
          {!productInColection &&
          <div>
           <button
                type="sumbit"
                onClick={handleRemoveProduct}
                className="general-btn"
              >
                Eliminar Producto
              </button>
              
            </div>
          }
             
      
        </div>
      </div>
    </div>
  );
}

export default DetailsProduct;
