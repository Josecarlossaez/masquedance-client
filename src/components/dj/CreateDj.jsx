

// import CSS
import "../../css/product/create-product.css";

// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Services Firebase
import { storage, db } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
// import { doc} from 'firebase/firestore'
import { collection, doc,setDoc } from 'firebase/firestore'

function CreateDj() {
// Navigate
const navigate = useNavigate();




// input values
const [nameInput, setNameInput] = useState("")
const [pictureUrlInput, setPictureUrl] = useState("")
const [descriptionInput, setDescriptionInput] = useState("")
// Value Restrictions
const maxCharacters = 600
// errorMessage from BE
const [errorMessage, setErrorMessage] = useState("")

// Cloudinary is Loading
const [isLoadingPicture, setIsLoadingPicture] = useState(false)

// Takes dj info
const handleNameChange = (e) => setNameInput(e.target.value);
const handleDescriptionChange = (e) =>  setDescriptionInput(e.target.value)
  
   


const handlePictureChange = async (e) => {
  setIsLoadingPicture(true)
   const image = e.target.files[0]
    // * upload image to firebaseStorage
  try {
 
  // 1 - Location where the picture is gonna be saved
  const storageRef = ref(storage, `images/${image.name}`) // 1- storage, 2-image-name-URL || 1 {the ref}, 2 {file it-self}
  // 2 - uploading the picture to firebase storage
  const snapShot = await uploadBytes(storageRef, image)
  // 3 - picture Url
  const downloadUrl = await getDownloadURL(snapShot.ref)
  setPictureUrl(downloadUrl)
  setIsLoadingPicture(false)

  // 4 - new doc
}catch(error){
  navigate("/error");
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
        const  djRef = collection(db,'djs');
        const newDjDocRef = doc(djRef);
        await setDoc(newDjDocRef, {
          id: newDjDocRef.id,
          name: nameInput,
          picture: pictureUrlInput,
          description: descriptionInput
        })
        alert("Dj añadido correctamente")
        window.location.reload(false)     
    } catch (error) {
      console.log(error)
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