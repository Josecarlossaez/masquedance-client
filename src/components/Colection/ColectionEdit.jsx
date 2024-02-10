import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Services Firebase
import { collection,doc,getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { auth, storage,} from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { AuthContext } from "../../context/auth.context";

function ColectionEdit() {
  const { colectionId } = useParams();
  const navigate = useNavigate();
  console.log("ENTRANDO EN COLECTION EDIT")

  
  // States
  // Fetching
  const [isFetching, setIsFetching] = useState(true);
  const [details, setDetails] = useState([]);
  const [nameInput, setName] = useState("");
  const [priceInput, setPrice] = useState("");
  const [pictureURL, setPictureUrl] = useState("");
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);
  // errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");
  const [okMessage, setOkMessage] = useState("")


  useEffect(() => {
    getData();
  }, []);

    // COLECTION DATA
  const getData = async () => {
    try {
    const colection = doc(db, 'colections', colectionId)
    const colectionById = await getDoc(colection)
    setDetails(colectionById.data());  
    console.log("Detalles de la colección", colectionById.data());
   
    // const { name, price, picture } = colectionById.data();
    setName(colectionById.data().name);
    setPrice(colectionById.data().price);
    setPictureUrl(colectionById.data().picture);
    setIsFetching(false);
} catch (error) {
    console.log("Error dentro de la búsqueda de los detalles de la colección",error)
    navigate("/")
}
};
    

  // TAKES NEW COLECTION INFO
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
   // LOAD PICTURE ON FIREBASE
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
      setPictureUrl(downloadUrl)
    setIsLoadingPicture(false)
  
      // 4 - new doc
    }catch(error){
      navigate("/error");
    }  
       
  };

  // UPDATE COLECTION
  const handleUpdateColection = async (e) => {
    e.preventDefault();

    try {
      const colectionToUpdate = doc(db, "colections", colectionId);
      await updateDoc(colectionToUpdate, {
        name: nameInput,
        price: priceInput,
        picture: pictureURL,
       
  });
      setOkMessage("Colección actualizada correctamente")
      setTimeout(() => {
        navigate("/list-colections");
      }, 2000);
      
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



  if (isFetching === true) {
    <h3>...Loading</h3>;
  }


  return (
    <section className="general-container">
    <div className="form-container">
      <form>
        <h3>Actualizar Colección</h3>
        {/*  */}
        <div className="input-container">
          <label className={nameInput && "filled"} htmlFor="Name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={nameInput}
            onChange={handleNameChange}
          />
        </div>
        {/*  */}
        <div className="input-container">
          <label className={priceInput && "filled"} htmlFor="Price">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={priceInput}
            onChange={handlePriceChange}
          />
        </div>
        {/*  */}
       
        {/*  */}

        
     
       

        <div className="uploader-pic">
          <input onChange={handlePictureChange} type="file" name="picture" />
          <label htmlFor="picture">Product Picture</label>
        </div>
        {isLoadingPicture === true && <p>...loading picture</p>}
        {/* Show the upload picture in this form */}
        {pictureURL !== "" ? (
          <img
            src={pictureURL || details.picture}
            alt="yourPic"
            width={200}
            className="uploader-img"
          />
        ) : (
          <p> [ No Picture Selected ]</p>
        )}

        <button
          type="submit"
          onClick={handleUpdateColection}
          className="general-btn"
        >
          Actualizar Colección
        </button>
        {errorMessage !== "" && (
          <p className="error-message"> * {errorMessage}</p>
          
        )}
        {okMessage !== "" && <p className="ok-message"> * {okMessage}</p>}

      </form>
    </div>
  </section>

  );
}

export default ColectionEdit;
