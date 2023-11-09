import React from "react";
// CSS
import "../../css/product/create-product.css";
// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import { auth, storage, db } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc } from 'firebase/firestore'
import { collection } from 'firebase/firestore'
// Services
import { createProductService } from "../../services/product.services";
import { uploadPictureService } from "../../services/upload.services.js";

// Utilities
import Select from "react-select";

const sizeOptions = [
  { value: "S", label: "S" },
  { value: "M", label: "M" },
  { value: "L", label: "L" },
  { value: "XL", label: "XL" },
  { value: "XXL", label: "XXL" },
];

const colorOptions = [
  { value: "amarillo", label: "amarillo" },
  { value: "azul", label: "azul" },
  { value: "blanco", label: "blanco" },
  { value: "negro", label: "negro" },
  { value: "verde", label: "verde" },
];
const referenceOptions = [
  { value: "true", label: "true" },
  { value: "false", label: "false" },
];

function CreateProduct() {
  const navigate = useNavigate();

  // input values
  const [nameInput, setName] = useState("");
  const [priceInput, setPrice] = useState("");
  const [sizeInput, setSize] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [colorInput, setColorInput] = useState("");
  // const [image, setImage] = useState([])
  const [pictureURL, setPictureUrl] = useState("");
  const [stockInput, setStock] = useState("");
  const [referenceInput, setReference] = useState("");

  // errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");
  // Takes product info
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSizeChange = (e) => setSize(e.value);
  const handleCantidadChange = (e) => setStock(e.target.value);

  const handleColorChange = (e) => setColorInput(e.value);
  const handleReferenceChange = (e) => setReference(e.value);

  // Cloudinary is Loading
  // const [isLoadingPicture, setIsLoadingPicture] = useState(false);

  const handlePictureChange = async (e) => {
    console.log("e.target picture", e.target.files[0])
   
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
      // 4 - new doc
    }catch(error){
      navigate("/error");
    }  
       
  };

  // Send the input values to BE
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    

    const newProduct = {
      name: nameInput,
      price: priceInput,
      picture: pictureURL,
      size: sizeInput,
      reference: referenceInput,
      description: descriptionInput,
      color: colorInput,
      stock: stockInput,
    };

    try {
      await addDoc(collection(db, 'products'), newProduct)
      alert("Producto añadido correctamente")
      window.location.reload(false)
    } catch (error) {
     console.log(error)
    }
  };

  return (
    <section className="general-container">
      <div className="form-container">
        <form>
          <h3>Crear Producto</h3>

          <div className="input-container">
            <input value={nameInput} onChange={handleNameChange} />
            <label className={nameInput && "filled"} htmlFor="name">
              Name
            </label>
          </div>
          <div className="input-container">
            <input value={priceInput} onChange={handlePriceChange} />
            <label className={priceInput && "filled"} htmlFor="price">
              Price
            </label>
          </div>

          <div className="input-container">
            <input
              value={descriptionInput}
              onChange={handleDescriptionChange}
            />

            <label
              className={descriptionInput && "filled"}
              htmlFor="description"
            >
              Description
            </label>
          </div>
          <div className="input-container">
            <input value={stockInput} onChange={handleCantidadChange} />

            <label className={stockInput && "filled"} htmlFor="stcok">
              Stock
            </label>
          </div>
          <div className="input-container">
            <div className="select-size">
              <div className="name-select">
                <h4>Talla</h4>
              </div>
              <div className="select-input">
                <Select
                  defaultValue={sizeInput}
                  onChange={handleSizeChange}
                  options={sizeOptions}
                />
              </div>
            </div>
          </div>

          <div className="input-container">
            <div className="select-size">
              <div className="name-select">
                <h4>Color</h4>
              </div>
              <div className="select-input">
                <Select
                  defaultValue={colorInput}
                  onChange={handleColorChange}
                  options={colorOptions}
                />
              </div>
            </div>
          </div>

          <div className="uploader-pic">
            <input onChange={handlePictureChange} type="file" name="picture" />
            <label htmlFor="picture">Product Picture</label>
          </div>

          <button
            type="submit"
            onClick={handleCreateProduct}
            className="general-btn"
          >
            Crear Producto
          </button>
          {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default CreateProduct;
