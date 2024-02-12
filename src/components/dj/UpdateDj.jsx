import React, { useContext, useEffect } from 'react'

// import CSS
import "../../css/product/create-product.css";

// React
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Context
// Services Firebase
import { collection,doc,getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { auth, storage,} from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'



function UpdateDj() {
  const { djId } = useParams()
// Navigate
const navigate = useNavigate();
// Loading
const [isFetching, setIsFetching] = useState(true);

const [details, setDetails] = useState([])

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
      const dj = doc(db, 'djs', djId)
      const djById = await getDoc(dj)
      setDetails(djById.data());

      const { name, description, picture} = djById.data()

      setNameInput(name)
      setDescriptionInput(description)
      setPictureUrlInput(picture)
      setIsFetching(false);

  } catch (error) {
      console.log(error)
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
  console.log("e.target picture", e.target.files[0])
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
    setPictureUrlInput(downloadUrl)
  setIsLoadingPicture(false)

    // 4 - new doc
  }catch(error){
    navigate("/error");
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
      const djToUpdate = doc(db,"djs",djId)
      await updateDoc(djToUpdate, djUpdate);
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