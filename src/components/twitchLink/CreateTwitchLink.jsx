import React from 'react'
// CSS
import "../../css/product/create-product.css"
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { createTwitchLinkService } from '../../services/twitchLink.services';
import { uploadPictureService } from '../../services/upload.services';

function CreateTwitchLink() {
  const navigate = useNavigate();
 // input values
 const [linkInput, setLinkInput] = useState("")
 const [pictureURL, setPictureUrl] = useState("");

 // errorMessages from BE
 const [errorMessage, setErrorMessage] = useState("");

 // Takes product info
 const handleTwitchLinkChange = (e) => setLinkInput(e.target.value);

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
  const handleCreateTwitchLink = async (e) => {
    e.preventDefault();

    const newTwitchLink = {
      link: linkInput,
      picture: pictureURL,
   
    };

    try {
      await createTwitchLinkService(newTwitchLink);
      navigate("/");
    } catch (error) {
      if (
        (error.response && error.response.status === 406) ||
        (error.response && error.response.status === 400)
      ) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <section className="general-container">
    <div className="form-container">
      <form>
        <h3>Crear TwitchLink</h3>

        <div className="input-container">
          <input value={linkInput} onChange={handleTwitchLinkChange} />
          <label className={linkInput && "filled"} htmlFor="link">
            Link
          </label>
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
          onClick={handleCreateTwitchLink}
          className="general-btn"
        >
          Crear TwitchLink
        </button>
        {errorMessage !== "" && (
          <p className="error-message"> * {errorMessage}</p>
        )}
      </form>
    </div>
  </section>
  )
}

export default CreateTwitchLink