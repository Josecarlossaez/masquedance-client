import React from "react";
// CSS
import "../../css/product/create-product.css";
// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Services Firebase
import { storage, db } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
// import { doc} from 'firebase/firestore'
import { collection, doc,setDoc } from 'firebase/firestore'



// Utilities
import Select from "react-select";

const colorOptions = [
  { value: "amarillo", label: "amarillo" },
  { value: "azul", label: "azul" },
  { value: "blanco", label: "blanco" },
  { value: "negro", label: "negro" },
  { value: "verde", label: "verde" },
];
const contieneTallasOptions = [
  { value: true, label: "true" },
  { value: false, label: "false" },

]


function CreateProduct() {
  const navigate = useNavigate();

  // input values
  const [nameInput, setName] = useState("");
  const [priceInput, setPrice] = useState("");
  const [stockSInput, setStockSInput] = useState("");
  const [stockMInput, setStockMInput] = useState("");
  const [stockLInput, setStockLInput] = useState("");
  const [stockXLInput, setStockXLInput] = useState("");
  const [stockXXLInput, setStockXXLInput] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [contieneTallasInput, setContieneTallasInput] = useState(false)
  // const [image, setImage] = useState([])
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);
  const [pictureURL, setPictureUrl] = useState("");


  // errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");
  // Takes product info
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleStockSInput = (e) => setStockSInput(e.target.value);
  const handleStockMInput = (e) => setStockMInput(e.target.value);
  const handleStockLInput = (e) => setStockLInput(e.target.value);
  const handleStockXLInput = (e) => setStockXLInput(e.target.value);
  const handleStockXXLInput = (e) => setStockXXLInput(e.target.value);
  const handleColorChange = (e) => setColorInput(e.value);
  const handleContieneTallasChange = (e) => setContieneTallasInput(e.value === true);

useEffect(() => {
  
console.log("contieneTAllas", contieneTallasInput)
  
}, [contieneTallasInput])


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
  const handleCreateProduct = async (e) => {
    e.preventDefault();

    try {
      const  productRef = collection(db,'products');
      const newProductDocRef = doc(productRef);

     
        await setDoc(newProductDocRef,{
                  id: newProductDocRef.id,
      name: nameInput,
      price: priceInput,
      color: colorInput,
      picture: pictureURL,
      description: descriptionInput,
      cantidad: 1,
      contieneTallas: contieneTallasInput,
      size: [
        {
          name: "S",
          stock: stockSInput
        },
       {
          name: "M",
          stock: stockMInput
        },
        {
          name: "L",
          stock: stockLInput
        },
        {
          name: "XL",
          stock: stockXLInput
        },
        {
          name: "XXL",
          stock: stockXXLInput
        },
      ]
    
      
    })
      

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
            <div className="select-size">
              <div className="name-select">
                <h4>Contiene Tallas</h4>
              </div>
              <div className="select-input">
                <Select
                  onChange={handleContieneTallasChange}
                  options={contieneTallasOptions}
                />
              </div>
            </div>
          </div>
          {contieneTallasInput &&
          <div>
          <div className="input-container">
            <input value={stockSInput} onChange={handleStockSInput} />
            <label className={stockSInput && "filled"} htmlFor="StockTallaS">
              Talla S Stock
            </label>
          </div>

          <div className="input-container">
            <input value={stockMInput} onChange={handleStockMInput} />

            <label className={stockMInput && "filled"} htmlFor="stocTallaM">
              Stock talla M
            </label>
          </div>

          <div className="input-container">
            <input value={stockLInput} onChange={handleStockLInput} />

            <label className={stockLInput && "filled"} htmlFor="stock">
              Stock talla L
            </label>
          </div>

          <div className="input-container">
            <input value={stockXLInput} onChange={handleStockXLInput} />

            <label className={stockXLInput && "filled"} htmlFor="stock">
              Stock talla XL
            </label>
          </div>

          <div className="input-container">
            <input value={stockXXLInput} onChange={handleStockXXLInput} />

            <label className={stockXXLInput && "filled"} htmlFor="stock">
              Stock talla XXL
            </label>
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
          </div>
           
          
          }
          

          

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
