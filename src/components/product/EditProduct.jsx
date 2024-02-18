import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../css/product/edit-product.css"
// Utilities
import Select from "react-select";
// Services Firebase
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { auth, storage, } from '../../firebase.js'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

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


function EditProduct() {
  const navigate = useNavigate();

  const { productId } = useParams();
  const [isFetching, setIsFetching] = useState(true);

  // input values
  const [details, setDetails] = useState([]);
  const [nameInput, setName] = useState("");
  const [priceInput, setPrice] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [colorInput, setColorInput] = useState("");
  const [pictureURL, setPictureUrl] = useState("");
  const [stockSInput, setStockSInput] = useState("");
  const [stockMInput, setStockMInput] = useState("");
  const [stockLInput, setStockLInput] = useState("");
  const [stockXLInput, setStockXLInput] = useState("");
  const [stockXXLInput, setStockXXLInput] = useState("");
  const [stockInput, setStockInput] = useState("")
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);
  const [contieneTallasInput, setContieneTallasInput] = useState(false)


  // errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");
  // Takes product info
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleColorChange = (e) => setColorInput(e.value);
  const handleStockInput = (e) => setStockInput(e.target.value);
  const handleStockSInput = (e) => setStockSInput(e.target.value);
  const handleStockMInput = (e) => setStockMInput(e.target.value);
  const handleStockLInput = (e) => setStockLInput(e.target.value);
  const handleStockXLInput = (e) => setStockXLInput(e.target.value);
  const handleStockXXLInput = (e) => setStockXXLInput(e.target.value);



  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const product = doc(db, 'products', productId)
      const productById = await getDoc(product)
      setDetails(productById.data());
      console.log("productByIdData", productById.data());
      setIsFetching(false);
      const { name, price, description, color, stock, picture, size, contieneTallas } =
        productById.data();
      setName(name);
      setPrice(price);
      setDescription(description);
      setStockInput(stock);
      setStockSInput(size[0].stock)
      setStockMInput(size[1].stock)
      setStockLInput(size[2].stock)
      setStockXLInput(size[3].stock)
      setStockXXLInput(size[4].stock)
      setColorInput(color);
      setPictureUrl(picture);
      setContieneTallasInput(contieneTallas)
    } catch (error) {
      navigate("/error")
    }
  };
  console.log("details del product-->", details)

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
    } catch (error) {
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
      const updatedProduct = {
        name: nameInput,
        price: priceInput,
        color: colorInput,
        picture: pictureURL,
        description: descriptionInput,
        cantidad: 1,
        stock: stockInput,
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
        ],
      }
      console.log("updated Product", updatedProduct);
      await updateDoc(productToUpdate, updatedProduct);



      navigate("/admin");
    } catch (error) {
      console.log("error al actualizar el producto", error)

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

          {!contieneTallasInput &&
            <div className="input-container">
              <input value={stockInput} onChange={handleStockInput} />

              <label className={stockInput && "filled"} htmlFor="stock">
                Stock
              </label>
            </div>
          }
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
