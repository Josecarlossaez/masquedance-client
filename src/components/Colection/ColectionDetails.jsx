import React from "react";
import "../../css/product/details-product.css";
import { useEffect, useState } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";
// Services Firebase
import { collection, getDocs,doc,getDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
// Context
import { AuthContext } from "../../context/auth.context.js";
import { useContext } from "react"

function ColectionDetails() {
  const { colectionId } = useParams();
  const { isLoggedIn } = useContext(AuthContext)

  const navigate = useNavigate();

  // States

  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")

  const [colectionDetails, setColectionDetails] = useState();
  // const [productId, setProductId] = useState();

  // States to check the sizes availables of this product

  // States to add object to Cart

  const [sizeSelected, setSizeSelected] = useState("S");
  useEffect(() => {
    getData();
  }, []);

 
  // Get the product Details data from API
  const getData = async () => {
    try {
      console.log("productId dentro de colectionDetails", colectionId)

      const product = doc(db, 'products', colectionId)
      const productById = await getDoc(product)
      setColectionDetails(productById.data());
      // setProductId(details.data.products.filter((eachP) => eachP.size === sizeSelected)[0]._id)
      // const productSizeS = details.data.products.find((eachP) => eachP.size === "S");
      // if (productSizeS) {
      //   handleClick("S", productSizeS._id);
      // }
  
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  

  // const tallas = colectionDetails?.products.filter(
  //   (each) => each.size === sizeSelected
  // );
 

  // const handleClick = (size, id) => {
  //   setSizeSelected(size);
  //   setProductId(id)

    // setProductId(
    //   colectionDetails?.products.filter(
    //     (eachP) => eachP.size === sizeSelected
    //   )[0]._id
    // );
  // };
 

  // const handleAddProductToCart = async () => {
  //   if(!isLoggedIn){
  //     setErrorMessage("tienes que estar registrado para poder añadir productos al carrito")
  //   }
  //   try {
  //     await addProductToCartService(productId);
  //     navigate("/cart");
  //   } catch (error) {
  //     navigate(error);
  //   }
  // };
  if (isFetching === true) {
    return <p>LOading...</p>;
  }

  return (
    <div>
      <div>
        <h1>Colection Details</h1>
      </div>
      {colectionDetails.length === 0 ? (
        <h1>Todavía no tienes productos que mostrar</h1>
      ) : (
        <div className="details-container">
          <div className="details-image">
            <img src={colectionDetails?.picture} alt="" />
          </div>
          <div className="details-data">
          <h3>{colectionDetails.name}</h3> 

            <div className="details-info">
             
              
              <h3>Precio: {colectionDetails?.price}€</h3>
              <h3>Descripción del artículo: {colectionDetails?.description}</h3>
              {/* {tallas[0]?.stock < 5 && 
                <p style={{ color: "red" }}> Ultimas unidades</p>
              } */}
            </div>
            <div className="details-sizeList">
              <h2>Seleccione Talla:</h2>
              <div className="sizes-container">
                {/* colectionDetails?.products.map((eachP) => (
                  <div key={eachP._id}>
                    {sizeSelected === eachP.size ? (
                      <button
                        className="sizes-selected"
                        onClick={() => handleClick(eachP.size)}
                      >
                        <h1>{eachP.size}</h1>
                      </button>
                    ) : (
                      <button
                        className="sizes"
                        onClick={() => handleClick(eachP.size, eachP._id) }
                      >
                        <h1>{eachP.size}</h1>
                      </button>
                    )}
                  </div>
                )) */}
                {colectionDetails.size.s.stock > 0 ? (

                  <button className="sizes">S</button> 
                ):(
                  <button  className="sizes-disabled">S</button> 
                )
                }
                {colectionDetails.size.m.stock > 0 ? (

                  <button className="sizes">M</button> 
                  ):(
                  <button  className="sizes-disabled">M</button> 
                  )}
                {colectionDetails.size.l.stock > 0 ? (

                  <button className="sizes">L</button> 
                  ):(
                  <button  className="sizes-disabled">L</button> 
                  )}
                {colectionDetails.size.xl.stock > 0 ? (

                  <button className="sizes">XL</button> 
                  ):(
                  <button  className="sizes-disabled">XL</button> 
                  )}
                {colectionDetails.size.xxl.stock > 0 ? (

                  <button className="sizes">XXL</button> 
                  ):(
                  <button  className="sizes-disabled">XXL</button> 
                  )}
               
                
              </div>
            </div>
              {/* ARRAY DE CANTIDAD */}
            {/* <div>
              <label htmlFor="quantity">Cantidad:</label>
              <select
                name="quantity"
                value={cantidad}
                onChange={handleCantidad}
              >
                {Array.from({ length: 30 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div> */}
            {/* FIN ARRAY DE CANTIDAD */}
            {/* <div>
              <button onClick={handleAddProductToCart} className="general-btn">
                Añadir al carrito
              </button>
              {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default ColectionDetails;
