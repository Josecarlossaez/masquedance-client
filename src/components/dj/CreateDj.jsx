import React from 'react'

// import CSS
import "../../css/product/create-product.css";

// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Services
import { createDjService } from '../../services/dj.services';
import { uploadPictureService } from '../../services/upload.services';

function CreateDj() {
// Navigate
const navigate = useNavigate();


// input values
const [nameInput, setNameInput] = useState("")
const [pictureUrlInput, setPictureUrlInput] = useState("")
const [descriptionInput, setDescriptionInput] = useState("")

// errorMessage from BE
const [errorMessage, setErrorMessage] = useState("")

// Cloudinary is Loading
const [isLoadingPicture, setIsLoadingPicture] = useState(false)

// Takes dj info
const handleNameChange = (e) => setNameInput(e.target.value);
const handleDescriptionChange = (e) => setDescriptionInput(e.target.value)
const handlePictureChange = async (e) => {
  setIsLoadingPicture(true);

 // upload the picture to cloudinary and receive the string for show the pic in the form

  const sendObj = new FormData();
  sendObj.append("picture", e.target.files[0]);

  try {
    const response = await uploadPictureService(sendObj)
    setPictureUrlInput(response.data.picture)
    // Cloudinary picture is Loading Off
    setIsLoadingPicture(false);
    
  } catch (error) {
    navigate("/error")
  }
};

// Send the input values to BE

   const handleCreateDj = async (e) => {
    e.preventDefault()

   const newDj = {
     name: nameInput,
     picture: pictureUrlInput,
     description: descriptionInput
   }

    try {
      await createDjService(newDj);
      navigate("/");

      
    } catch (error) {
      if(

        (error.response && error.response.status === 406) || 
        (error.response && error.response.status === 400)
      ){
        setErrorMessage(error.response.data.message);
      }
    }

   
   };


  return (
    <section className="general-container">
      <div className="form-container">
        <form >
          <h3>Crear DJ</h3>

          <div className="input-container">
            <input value={nameInput} onChange={handleNameChange} />
            <label className={nameInput && "filled"} htmlFor="name">
              Name
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

          <div className="uploader-pic">
            <input onChange={handlePictureChange} type="file" name="picture" />
            <label htmlFor="picture">Product Picture</label>
          </div>
          {isLoadingPicture === true && <p>...loading picture</p>}
          {/* Show the upload picture in this form */}
          {pictureUrlInput !== "" ? (
            <img
              src={pictureUrlInput}
              alt="yourPic"
              width={200}
              className="uploader-img"
            />
          ) : (
            <p> [ No Picture Selected ]</p>
          )}
        

          <button
            type="submit"
            onClick={handleCreateDj}
           className="general-btn"
          >
            Crear DJ
          </button>
          {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}

        </form>
      </div>

    
    </section>
  )
}

export default CreateDj