import React, { useEffect } from 'react'
// CSS
import "../../css/product/create-product.css"
// Services
import { createTrackService } from "../../services/track.services.js"
import { uploadPictureService } from "../../services/upload.services"
import { listDjService } from '../../services/dj.services'
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Utilities
import Select from 'react-select'



function CreateTrack() {
    const navigate = useNavigate();

    const djOptions = [
      {value: 'dj Duchi', label: 'dj Duchi'},
      {value: 'dj Alfre', label: 'dj Alfre'},
      {value: 'dj Mio', label: 'dj Mio'},
    ]

  // input values
   const [titleInput, setTitle] = useState("");
   const [djInput, setDj] = useState("");
  const [audioURL, setAudioUrl] = useState();

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
   const handleAudioChange =  (e) => setAudioUrl(e.target.files[0])
  

     console.log("audioUrl", audioURL)

   

 
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

      

        <div >
          <input onChange={handleAudioChange} type="file" name="audio" accept= ".mp3, .mpeg .wav" />
          <label htmlFor="audio">Track</label>
        </div>
       
      

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