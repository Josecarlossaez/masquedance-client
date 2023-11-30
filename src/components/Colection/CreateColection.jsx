import React from 'react'

// CSS
import "../../css/product/create-product.css"

// Services
import { auth, storage, db } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc } from 'firebase/firestore'
import { collection } from 'firebase/firestore'

// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function CreateColection() {

    const navigate = useNavigate();

// input values
const [nameInput, setNameInput] = useState("")
const [priceInput, setPriceInput] = useState("")
const [pictureUrl, setPictureUrl] = useState("")
//Download picture direction from Firebase
const [isLoadingPicture, setIsLoadingPicture] = useState(false);


 // errorMessages from BE
 const [errorMessage, setErrorMessage] = useState("");

// Takes Colection info
const handleNameChange = (e) => setNameInput(e.target.value);
const handleSizeChange = (e) => setPriceInput(e.target.value)

// Upload picture to Cloudinary
   // Cloudinary is Loading
 

   const handlePictureChange = async (e) => {
    setIsLoadingPicture(true)

    const image = e.target.files[0]
     // * upload image to firebaseStorage
   try {
  
     console.log("image.name", image.name);
   // 1 - Location where the picture is gonna be saved
   const storageRef = ref(storage, `images/${image.name}`) // 1- storage, 2-image-name-URL || 1 {the ref}, 2 {file it-self}
   // 2 - uploading the picture to firebase storage
   const snapShot = await uploadBytes(storageRef, image)
   // 3 - picture Url
   const downloadUrl = await getDownloadURL(snapShot.ref)
   console.log("downloadUrl", downloadUrl);
   setPictureUrl(downloadUrl)
   setIsLoadingPicture(false)

   // 4 - new doc
 }catch(error){
   navigate("/error");
 }  
  };

  // Create Colection
  const handleCreateColection = async (e) => {
   e.preventDefault()
    try {
      const newColection = await addDoc(collection(db, 'colections'), {
        name: nameInput,
        price: priceInput,
        picture: pictureUrl,
      }) 
      alert("Colección añadida correctamente")
      window.location.reload(false)
        navigate("/list-colections")
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