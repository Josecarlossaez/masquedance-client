import React from 'react'
// CSS
import "../../css/product/create-product.css"
// Services
import { createTrackService } from "../../services/track.services.js"
import { uploadPictureService } from "../../services/upload.services"
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utilities
import Select from 'react-select'

const djOptions = [
    {value: 'dj Duchi', label: 'dj Duchi'},
    {value: 'dj Alfre', label: 'dj Alfre'},
    {value: 'dj Mio', label: 'dj Mio'},
    
    
  ]

function CreateTrack() {
    const navigate = useNavigate();

  // input values
   const [titleInput, setTitle] = useState("");
   const [djInput, setDj] = useState("");
  const [audioURL, setAudioUrl] = useState("");

 
 // errorMessages from BE
   const [errorMessage, setErrorMessage] = useState("");
 // Takes user info
   const handleTitleChange = (e) => setTitle(e.target.value);
   const handleDjChange = (e) => setDj(e.value);


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

      setAudioUrl(response.data.picture);
      // Cloudinary picture is Loading Off
      setIsLoadingPicture(false);
    } catch (error) {
      navigate("/error");
    }
  };
   

 
 // Send the input values to BE
   const handleCreateTrack = async (e) => {
     e.preventDefault();
 
     const newTrack = {
       title: titleInput,
       audio: audioURL,
       
       dj: djInput,
     
     
     };
 
     try {
       await createTrackService(newTrack);
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
        <h3>Crear Track</h3>

        <div className="input-container">
          <input value={titleInput} onChange={handleTitleChange} />
          <label className={titleInput && "filled"} htmlFor="name">
            Name
          </label>
        </div>
   
        <div className="input-container">
          <div className="select-size">
          <div className='name-select'>
            <h4>DJ</h4>
          </div>
          <div className='select-input'>
             <Select 
            defaultValue={djInput}
            onChange={handleDjChange}
            options={djOptions}
          />
          </div>

          </div>
         
        </div>

      

        <div className="uploader-pic">
          <input onChange={handlePictureChange} type="file" name="audio" />
          <label htmlFor="audio">Track</label>
        </div>
        {isLoadingPicture === true && <p>...loading audio</p>}
        {/* Show the upload picture in this form */}
        {audioURL !== "" ? (
          <img
            src={audioURL}
            alt="yourPic"
            width={200}
            className="uploader-img"
          />
        ) : (
          <p> [ No Picture Selected ]</p>
        )}
      

        <button
          type="submit"
          onClick={handleCreateTrack}
         className="general-btn"
        >
          Crear Track
        </button>
        {errorMessage !== "" && (
          <p className="error-message"> * {errorMessage}</p>
        )}

      </form>
    </div>

  
  </section>
  )
}

export default CreateTrack