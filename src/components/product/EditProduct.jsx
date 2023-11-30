import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Utilities
import Select from "react-select";
// Services Firebase
import { collection,doc,getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { auth, storage,} from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

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


function EditProduct() {
  const navigate = useNavigate();

  const { productId } = useParams();
  const [isFetching, setIsFetching] = useState(true);

  // input values
  const [details, setDetails] = useState([]);
  const [nameInput, setName] = useState("");
  const [priceInput, setPrice] = useState("");
  const [sizeInput, setSize] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [pictureURL, setPictureUrl] = useState("");
  const [stockInput, setStock] = useState("");
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);

  // errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");
  // Takes product info
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleSizeChange = (e) => setSize(e.value);
  const handleCantidadChange = (e) => setStock(e.target.value);
  const handleColorChange = (e) => setColorInput(e.value);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const product = doc(db, 'products', productId)
      const productById = await getDoc(product)
      setDetails(productById.data());
      setIsFetching(false);
      const { name, price, description, color, size, stock, picture } =
        productById.data();
      setName(name);
      setPrice(price);
      setDescription(description);
      setStock(stock);
      setSize(size);
      setColorInput(color);
      setPictureUrl(picture);
    } catch (error) {
      navigate("/error")
    }
  };

// Firebase storagePicture
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

  // Send the input values to BE
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    // const productUpdate = {
      
    // };

    try {
      const productToUpdate = doc(db, "products", productId);

// Set the "capital" field of the city 'DC'
await updateDoc(productToUpdate, {
      name: nameInput,
      price: priceInput,
      picture: pictureURL,
      size: sizeInput,
      description: descriptionInput,
      color: colorInput,
      stock: stockInput,
});
      
    
    
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

  if (isFetching === true) {
    <h3>...Loading</h3>;
  }

  return (
    <section className="general-container">
      <div className="form-container">
        <form>
          <h3>Actualizar Producto</h3>
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
          <div className="input-container">
            <label
              className={descriptionInput && "filled"}
              htmlFor="Description"
            >
              Description
            </label>
            <input
              type="text-area"
              name="description"
              value={descriptionInput}
              onChange={handleDescriptionChange}
            />
          </div>
          {/*  */}

          <div className="input-container">
            <label className={stockInput && "filled"} htmlFor="stock">
              Stock
            </label>
            <input value={stockInput} onChange={handleCantidadChange} />
          </div>
          <div className="input-container">
            <div className="select-size">
              <div className="name-select">
                <h4>Talla</h4>
              </div>
              <div className="select-input">
                <Select
                  defaultValue={sizeInput || details.size}
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
                  defaultValue={colorInput || details.color}
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
            onClick={handleUpdateProduct}
            className="general-btn"
          >
            Actualizar Producto
          </button>
          {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default EditProduct;
