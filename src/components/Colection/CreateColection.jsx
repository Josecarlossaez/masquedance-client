import React from 'react'

// CSS
import "../../css/product/create-product.css"

// Services
import { createColectionService } from '../../services/colection.services'
import { uploadPictureService } from "../../services/upload.services"

// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function CreateColection() {

    const navigate = useNavigate();

// input values
const [nameInput, setNameInput] = useState("")
const [priceInput, setPriceInput] = useState("")
const [pictureUrl, setPictureUrl] = useState("")

 // errorMessages from BE
 const [errorMessage, setErrorMessage] = useState("");

// Takes Colection info
const handleNameChange = (e) => setNameInput(e.target.value);
const handleSizeChange = (e) => setPriceInput(e.target.value)

// Upload picture to Cloudinary
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

  // Create Colection
  const handleCreateColection = async (e) => {
   e.preventDefault()

   const newColection = {
    name: nameInput,
    price: priceInput,
    picture: pictureUrl,
   }
    try {
        await createColectionService(newColection);
        navigate("/admin")
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
  }

  return (
    <section className="general-container">
    <div className="form-container">
      <form >
        <h3>Crear Colección</h3>

        <div className="input-container">
          <input value={nameInput} onChange={handleNameChange} />
          <label className={nameInput && "filled"} htmlFor="name">
            Name
          </label>
        </div>
        <div className="input-container">
          <input value={priceInput} onChange={handleSizeChange} />
          <label className={priceInput && "filled"} htmlFor="price">
            Price
          </label>
        </div>

        


          <div className="uploader-pic">
            <input onChange={handlePictureChange} type="file" name="picture" />
            <label htmlFor="picture">Product Picture</label>
          </div>
          {isLoadingPicture === true && <p>...loading picture</p>}
          {/* Show the upload picture in this form */}
          {pictureUrl !== "" ? (
            <img
              src={pictureUrl}
              alt="yourPic"
              width={200}
              className="uploader-img"
            />
          ) : (
            <p> [ No Picture Selected ]</p>
          )}
        


        
       
      

        <button
          type="submit"
          onClick={handleCreateColection}
         className="general-btn"
        >
          Crear Colección
        </button>
        {errorMessage !== "" && (
          <p className="error-message"> * {errorMessage}</p>
        )}

      </form>
    </div>

  
  </section>
  )
}

export default CreateColection