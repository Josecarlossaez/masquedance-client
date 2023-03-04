import React from 'react'
// CSS
import "../../css/product/create-product.css"
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { createProductService } from "../../services/product.services"

// Utilities
import Select from 'react-select';

const sizeOptions = [
  {value: 'S', label: 'S'},
  {value: 'M', label: 'M'},
  {value: 'L', label: 'L'},
  {value: 'XL', label: 'XL'},
  {value: 'XXL', label: 'XXL'},
  
]

const colorOptions = [
  {value: 'amarillo', label: 'amarillo'},
  {value: 'azul', label: 'azul'},
  {value: 'blanco', label: 'blanco'},
  {value: 'negro', label: 'negro'},
  {value: 'verde', label: 'verde'},
  
]


function CreateProduct() {
  const navigate = useNavigate();

  // input values
   const [nameInput, setUsername] = useState("");
   const [priceInput, setPrice] = useState("");
   const [sizeInput, setSize] = useState("");
   const [descriptionInput, setDescription] = useState("");
   const [colorInput, setColorInput] = useState("")
 
 // errorMessages from BE
   const [errorMessage, setErrorMessage] = useState("");
 // Takes user info
   const handleNameChange = (e) => setUsername(e.target.value);
   const handlePriceChange = (e) => setPrice(e.target.value);
   const handlePasswordChange = (e) => setDescription(e.target.value);
   const handleSizeChange = (e) => setSize(e.value);
   const handleColorChange = (e) => setColorInput(e.value);
   console.log("colorInput",colorInput)

 
 // Send the input values to BE
   const handleCreateProduct = async (e) => {
     e.preventDefault();
 
     const newProduct = {
       name: nameInput,
       price: priceInput,
       description: descriptionInput,
       size: sizeInput,
       color: colorInput
     
     };
 
     try {
       await createProductService(newProduct);
       navigate("/");
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
              onChange={handlePasswordChange}
            />
            <label className={descriptionInput && "filled"} htmlFor="password">
              Description
            </label>
          <div className="input-container">
            <div className="select-size">
            <div className='name-select'>
              <h4>Talla</h4>
            </div>
            <div className='select-input'>
               <Select 
              defaultValue={sizeInput}
              onChange={handleSizeChange}
              options={sizeOptions}
            />
            </div>

            </div>
           
          </div>

          <div className="input-container">
            <div className="select-size">
            <div className='name-select'>
              <h4>Color</h4>
            </div>
            <div className='select-input'>
               <Select 
              defaultValue={colorInput}
              onChange={handleColorChange}
              options={colorOptions}
            />
            </div>

            </div>
           
          </div>
          </div>

         

          <button
            type="submit"
            onClick={handleCreateProduct}
           className="general-btn"
          >
            Crear Producto
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