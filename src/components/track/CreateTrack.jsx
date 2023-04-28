import React, { useEffect } from 'react'
// CSS
import "../../css/product/create-product.css"
// Services
import { createTrackService } from "../../services/track.services.js"
import { uploadAudioService, uploadPictureService } from "../../services/upload.services"
import { listDjService } from '../../services/dj.services'
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utilities
import Select from 'react-select'



function CreateTrack() {
    const navigate = useNavigate();


  // input values
   const [titleInput, setTitle] = useState("");
   const [djInput, setDj] = useState("");
   const [audioURL, setAudioUrl] = useState();
  const [pictureURL, setPictureUrl] = useState("");


  // Data
  const [listDj, setListDj] = useState()

 
 // errorMessages from BE
   const [errorMessage, setErrorMessage] = useState("");
       
    useEffect(() => {
      getData()
    }, [])
    
    const getData = async () => {
      try {
        const responseListDj = await listDjService()
        console.log("responseListDj", responseListDj)
          setListDj(responseListDj.data)
          
      } catch (error) {
        navigate("/error")
      }
      
    }
    
  


 // Takes user info
   const handleTitleChange = (e) => setTitle(e.target.value);
   const handleDjChange = async (e) => setDj(e.target.value);

   // CLOUDINARY IS LOADING
   const [isLoadingAudio, setIsLoadingAudio] = useState(false)
   const handleAudioChange =  async (e) => {
    // Cloudinary audio is loading on
     setIsLoadingAudio(true)

     // upload the audio to cloudinary and receive the string for show the pic in the Form
     const sendObjAudio = new FormData()
     sendObjAudio.append("audio", e.target.files[0]);

     try {
       const response = await uploadAudioService(sendObjAudio);
       setAudioUrl(response.data.audio);
       // cloudinary audio is loading off
       setIsLoadingAudio(false)
     } catch (error) {
      navigate("/error")
     }
   }

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
  

     console.log("audioUrl", audioURL)

   

 
 // Send the input values to BE
   const handleCreateTrack = async (e) => {
     e.preventDefault();
 
     const newTrack = {
       title: titleInput,
       audio: audioURL,
       picture: pictureURL,
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
          <select onChange={handleDjChange}>
              {listDj?.map((opt) => (
                <option key={opt._id} value={opt._id}>
                  {opt.name}
                </option>
              ))};
            </select>
          </div>

          </div>
         
        </div>

      

        <div className="uploader-pic">
          <input onChange={handleAudioChange} type="file" name="audio" accept= ".mp3, .mpeg .wav" />
          <label htmlFor="audio">Track</label>
        </div>
          {isLoadingAudio === true && <p>...loading audio</p>}
          {/* Show the upload picture in this form */}
          {audioURL !== "" ? (
            <img
              src={audioURL}
              alt="yourPic"
              width={200}
              className="uploader-img"
            />
          ) : (
            <p> [ No Audio Selected ]</p>
          )}


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