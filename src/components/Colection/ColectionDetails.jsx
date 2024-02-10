import React from "react";
import "../../css/product/details-product.css";
import { useEffect, useState, useContext } from "react";

import { useNavigate, useParams, Link } from "react-router-dom";
// Services Firebase
import { collection, getDocs, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../firebase'
// Context
import { AuthContext } from "../../context/auth.context.js";


function ColectionDetails() {
  const { colectionId } = useParams();
  const { isLoggedIn, user, getUserData } = useContext(AuthContext)

  const navigate = useNavigate();

  // States

  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState("")

  const [colectionDetails, setColectionDetails] = useState();
  // const [productId, setProductId] = useState();

  // States to check the sizes availables of this product

  // States to add object to Cart

  const [sizeSelected, setSizeSelected] = useState("");
  const [setsizeStockSelected, setSizeStockSelected] = useState("")
  useEffect(() => {
    getData();
   
  }, []);

  // useEffect(() => {
  //  console.log("colection Details ==> ", colectionDetails)
  //  if(colectionDetails?.contieneTallas === true) {
  //   setSizeSelected(colectionDetails)
  //   colectionDetails
  //  }
  // }, [colectionDetails]);




  // Get the product Details data from API
  const getData = async () => {
    try {
      const product = doc(db, 'products', colectionId)
      const productById = await getDoc(product)
      setColectionDetails(productById.data());
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };



  // const tallas = colectionDetails?.products.filter(
  //   (each) => each.size === sizeSelected
  // );


  const handleClick = (size) => {
    setSizeSelected(size);
    colectionDetails.size.forEach((each) => {
      if(each.name === size){
        setSizeStockSelected(each.stock)
      }
    })
  };
  // const handleStockSelected = (each) => {
  //   console.log("eahc stock", each)
  //   setSizeStockSelected(each)
  // }


  const handleAddProductToCart = async () => {
    if (!isLoggedIn) {
      setErrorMessage("tienes que estar registrado para poder añadir productos al carrito")
    }
    console.log("sizeSelected", sizeSelected);
    const productToCart = {
      ...colectionDetails,
      sizeSelected: sizeSelected,
    }


    let foundMatch = false;
    try {
      const userToUpdate = doc(db, "users", user.id)
      for (const each of user.cart) {
        console.log("entrando en el for")
        if ( productToCart.name === each.name && productToCart.sizeSelected === each.sizeSelected) {
          console.log("entrando en el primer if")
          foundMatch = true;        
            each.cantidad = each.cantidad + 1
            await updateDoc(userToUpdate, { cart: user.cart })
            getUserData()
            navigate("/cart");
         
        }   
      }
      if (!foundMatch) {
     await updateDoc(userToUpdate, {
       cart: arrayUnion(productToCart)
     })
     getUserData()
     navigate("/cart");
   }
    } catch (error) {
      navigate(error);
    }
  };
  if (isFetching === true) {
    return <p>LOading...</p>;
  }

  return (
    <div className="main-colection-details">
     
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
              <h5>Descripción del artículo: {colectionDetails?.description}</h5>
              <h4>Precio: {colectionDetails?.price}€</h4>
            </div>
            {colectionDetails.contieneTallas === true &&
              <div className="sizes-container">
                  <h2>Seleccione Talla:</h2>
                <div className="details-sizeList">
                  {colectionDetails?.size.map((eachSize) => (
                    eachSize.stock > 0 && (

                    <div key={eachSize.name}>
                      {sizeSelected === eachSize.name ? (
                        <button
                          className="sizes-selected"
                          onClick={() => handleClick(eachSize.name)}
                        >
                          <h1>{eachSize.name}</h1>
                        </button>
                      ) : (
                        <button
                          className="sizes"
                          onClick={() => handleClick(eachSize.name)}
                        >
                          <h1>{eachSize.name}</h1>
                        </button>
                      )}
                    </div>
                    )
                    

                  ))}
                </div>
                  {sizeSelected !== "" &&  
                <p style={{ color: "blue" }}> Quedan {setsizeStockSelected} unidades</p>
                  }
              </div>
            }
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
            <div className="añadir-button">
              <button onClick={handleAddProductToCart} className="general-btn">
                Añadir al carrito
              </button>
              {errorMessage !== "" && (
                <p className="error-message"> * {errorMessage}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ColectionDetails;
