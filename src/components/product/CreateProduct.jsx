import React from 'react'
// CSS
import "../../css/product/create-product.css"
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { createProductService } from "../../services/product.services"
import { uploadPictureService } from "../../services/upload.services.js";


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
   const [nameInput, setName] = useState("");
   const [priceInput, setPrice] = useState("");
   const [sizeInput, setSize] = useState("");
   const [descriptionInput, setDescription] = useState("");
   const [colorInput, setColorInput] = useState("")
   const [pictureURL, setPictureUrl] = useState("");
   const [cantidadInput, setCantidad] = useState("")
   const [referenceInput, setReference] = useState("")

   

 
 // errorMessages from BE
   const [errorMessage, setErrorMessage] = useState("");
 // Takes product info
   const handleNameChange = (e) => setName(e.target.value);
   const handlePriceChange = (e) => setPrice(e.target.value);
   const handleDescriptionChange = (e) => setDescription(e.target.value);
   const handleSizeChange = (e) => setSize(e.value);
  const handleCantidadChange = (e) => setCantidad(e.target.value);

  const handleColorChange = (e) => setColorInput(e.value);
  

    // Cloudinary is Loading
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);

   const handlePictureChange = async (e) => {
    // Cloudinary picture is Loading On
    setIsLoadingPicture(true);

    // upload the picture to cloudinary and receive the string for show the pic in the form
    const sendObj = new FormData();
    sendObj.append("picture", e.target.files[0]);

    try {
      const response = await uploadPictureService(sendObj);

      setPictureUrl(response.data.picture);
      // Cloudinary picture is Loading Off
      setIsLoadingPicture(false);
    } catch (error) {
      navigate("/error");
    }
  };
   

 
 // Send the input values to BE
   const handleCreateProduct = async (e) => {
     e.preventDefault();
 
     const newProduct = {
      name: nameInput,
      price: priceInput,
      picture:pictureURL,
      size: sizeInput,
      reference: referenceInput,
      description: descriptionInput,
      color: colorInput,
      cantidad: cantidadInput,
     
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
              onChange={handleDescriptionChange}
            />
            
            <label className={descriptionInput && "filled"} htmlFor="description">
              Description
            </label>
          </div>
          <div className="input-container">
            <input
              value={descriptionInput}
              onChange={handleCantidadChange}
            />
            
            <label className={cantidadInput && "filled"} htmlFor="cantidad">
              Cantidad
            </label>
          </div>
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

          <div className="uploader-pic">
            <input onChange={handlePictureChange} type="file" name="picture" />
            <label htmlFor="picture">Product Picture</label>
          </div>
          {isLoadingPicture === true && <p>...loading picture</p>}
          {/* Show the upload picture in this form */}
          {pictureURL !== "" ? (
            <img
              src={pictureURL}
              alt="yourPic"
              width={200}
              className="uploader-img"
            />
          ) : (
            <p> [ No Picture Selected ]</p>
          )}
        

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