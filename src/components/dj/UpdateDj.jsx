import React, { useContext, useEffect } from 'react'

// import CSS
import "../../css/product/create-product.css";

// React
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Context


// Services

import { uploadPictureService } from '../../services/upload.services';
import { deleteDjService, detailsDjService, updateDjService } from '../../services/dj.services';

function UpdateDj() {
  const { djId } = useParams()
// Navigate
const navigate = useNavigate();
// Loading
const [isFetching, setIsFetching] = useState(true);

// input values
const [nameInput, setNameInput] = useState("")
const [pictureUrlInput, setPictureUrlInput] = useState("")
const [descriptionInput, setDescriptionInput] = useState("")
// Value Restrictions
const maxCharacters = 600
// Message from BE
const [errorMessage, setErrorMessage] = useState("")
const [okMessage, setOkMessage] = useState("");
// Cloudinary is Loading
const [isLoadingPicture, setIsLoadingPicture] = useState(false)

useEffect(() => {
  getData()
}, [])

const getData = async () => {
  try {
      const response = await detailsDjService(djId)
      const { name, description, picture } = response.data
      setNameInput(name)
      setDescriptionInput(description)
      setPictureUrlInput(picture)
      setIsFetching(false);

  } catch (error) {
      navigate("/error")
  }
}



if (isFetching === true) {
  return <p>...loading</p>;
}




// Takes dj info
const handleNameChange = (e) => setNameInput(e.target.value);
const handleDescriptionChange = (e) =>  setDescriptionInput(e.target.value)
  
   


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

   const handleUpdateDj = async (e) => {
    e.preventDefault()
    console.log("djId", djId)

   const djUpdate = {
     name: nameInput,
     picture: pictureUrlInput,
     description: descriptionInput
   }

    try {
      await updateDjService(djUpdate,djId);
      window.alert("Dj ACTUALIZADO CORRECTAMENTE");
      // setOkMessage("Producto añadido correctamente");
      // setTimeout(() => {
      //   setOkMessage("");
      // }, 2000);

      navigate("/list-djs");

      
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
          <h3>Actualizar DJ</h3>

          <div className="input-container">
            <input value={nameInput} onChange={handleNameChange} />
            <label className={nameInput && "filled"} htmlFor="name">
              Name
            </label>
          </div>
          
          {/* <div className="input-container">
            <input
              type='text-area'
              value={descriptionInput}
              onChange={handleDescriptionChange}
            />
            <label className={descriptionInput && "filled"} htmlFor="description">
              Description
            </label>
          

     
          </div> */}
          <div className="input-container">
          <textarea
        rows={Math.min(5, Math.max(2, descriptionInput.split('\n').length))}
        value={descriptionInput}
        onChange={handleDescriptionChange}
        maxLength={maxCharacters}
      />
      <label className={descriptionInput && "filled"} htmlFor="name">
              Description
            </label>
      <p>Tienes {maxCharacters - descriptionInput.length} carácteres disponibles</p>
          

     
          </div> 

          {/*  */}

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
            onClick={handleUpdateDj}
           className="general-btn"
          >
            Actualizar DJ
          </button>
         
          {errorMessage !== "" && ( <p className="error-message"> * {errorMessage}</p> )}
          {okMessage !== "" && <p className="ok-message"> * {okMessage}</p>}

           
          

        </form>
      </div>

    
    </section>
  )
}

export default UpdateDj;