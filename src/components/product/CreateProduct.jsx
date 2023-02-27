import React from 'react'
// CSS
import "../../css/product/create-product.css"
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { createProductService } from "../../services/product.services"
function CreateProduct() {
  const navigate = useNavigate();

  // input values
   const [nameInput, setUsername] = useState("");
   const [priceInput, setPrice] = useState("");
   const [descriptionInput, setDescription] = useState("");
 
 // errorMessages from BE
   const [errorMessage, setErrorMessage] = useState("");
 // Takes user info
   const handleNameChange = (e) => setUsername(e.target.value);
   const handlePriceChange = (e) => setPrice(e.target.value);
   const handlePasswordChange = (e) => setDescription(e.target.value);
 
 // Send the input values to BE
   const handleSignup = async (e) => {
     e.preventDefault();
 
     const newProduct = {
       name: nameInput,
       price: priceInput,
       description: descriptionInput
     
     };
 
     try {
       await createProductService(newProduct);
       navigate("/login");
     } catch (error) {
       if (
         (error.response && error.response.status === 406) ||
         (error.response && error.response.status === 400)
       ) {
         setErrorMessage(error.response.data.message);
       } else {
         navigate("/error");
       }
     }
   };

  return (
    <section className="general-container">
      <div className="form-container">
        <form >
          <h3>Crear Producto</h3>

          <div className="input-container">
            <input value={nameInput} onChange={handleNameChange} />
            <label className={nameInput && "filled"} htmlFor="name">
              Name
            </label>
          </div>
          <div className="input-container">
            <input value={priceInput} onChange={handlePriceChange} />
            <label className={priceInput && "filled"} htmlFor="price">
              Price
            </label>
          </div>
          <div className="input-container">
            <input
              value={descriptionInput}
              type="password"
              onChange={handlePasswordChange}
            />
            <label className={descriptionInput && "filled"} htmlFor="password">
              Description
            </label>
          </div>

         

          <button
            type="submit"
            onClick={handleSignup}
           className="general-btn"
          >
            Register
          </button>
          {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}

        </form>
      </div>

    
    </section>
  )
}

export default CreateProduct