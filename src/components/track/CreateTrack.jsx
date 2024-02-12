import React, { useEffect } from 'react'
// CSS
import "../../css/product/create-product.css"
// Services FIREBASE
import { collection, getDocs,setDoc, doc } from 'firebase/firestore'
import { db, storage } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";




function CreateTrack() {
    const navigate = useNavigate();


  // input values
   const [titleInput, setTitle] = useState("");
   const [djInput, setDj] = useState("");
   const [audioURL, setAudioUrl] = useState();
  const [pictureURL, setPictureUrl] = useState("");

  

  // Data
  const [isFetching, setIsFetching] = useState(true);
  const [listDj, setListDj] = useState()

 
 // errorMessages from BE
   const [errorMessage, setErrorMessage] = useState("");
       
    useEffect(() => {
      getData()
    }, [])
    
    const getData = async () => {
      const docs = []
      const querySnapshot = await getDocs(collection(db, "djs"));
      console.log("querySnapshot", querySnapshot)
      querySnapshot.forEach((doc) => {
        docs.push({...doc.data(), id:doc.id})
        setListDj(docs)
      })
      setIsFetching(false)
    }
    
  


 // Takes track info
   const handleTitleChange = (e) => setTitle(e.target.value);
   const handleDjChange = async (e) => setDj(e.target.value);

   // CLOUDINARY IS LOADING
   const [isLoadingAudio, setIsLoadingAudio] = useState(false)
   const handleAudioChange =  async (e) => {
    setIsLoadingAudio(true)
    const audio = e.target.files[0]
     // * upload image to firebaseStorage
   try {
  
   // 1 - Location where the picture is gonna be saved
   const storageRef = ref(storage, `audios/${audio.name}`) // 1- storage, 2-image-name-URL || 1 {the ref}, 2 {file it-self}
   // 2 - uploading the picture to firebase storage
   const snapShot = await uploadBytes(storageRef, audio)
   // 3 - picture Url
   const downloadUrl = await getDownloadURL(snapShot.ref)
   setAudioUrl(downloadUrl)
   setIsLoadingAudio(false)

   // 4 - new doc
 }catch(error){
   navigate("/error");
 } 
   }

   // Save picture at the Firebase Storage
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);

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
  

     console.log("audioUrl", audioURL)

   

 
 // Send the input values to BE
   const handleCreateTrack = async (e) => {
     e.preventDefault();
 
     try {
       const trackRef = collection(db, 'tracks')
       const newTrackRef = doc(trackRef)
       await setDoc(newTrackRef,{
        id: newTrackRef.id,
        title: titleInput,
        audio: audioURL,
        picture: pictureURL,
        dj: djInput,
      })
       navigate("/");
     } catch (error) {
      console.log(error)
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
   if (isFetching === true) {
    return <p>...loading</p>;
  }

 
   
  return (
    <section className="general-container">
    <div className="form-container">
      <form >
        <h3>Crear Track</h3>

        <div className="input-container">
          <input value={titleInput} onChange={handleTitleChange} />
          <label className={titleInput && "filled"} htmlFor="title">
            Title
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