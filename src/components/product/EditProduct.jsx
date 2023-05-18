import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { uploadPictureService } from "../../services/upload.services";

// Utilities
import Select from "react-select";
// Services
import { detailsProductService } from "../../services/product.services";
import { updateProductService } from "../../services/product.services";

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
    const response = await detailsProductService(productId);
    setDetails(response.data);
    setIsFetching(false);
    const { name, price, description, color, size, stock, picture } =
      response.data;
    setName(name);
    setPrice(price);
    setDescription(description);
    setStock(stock);
    setSize(size);
    setColorInput(color);
    setPictureUrl(picture);
  };

  // Cloudinary is Loading

  const handlePictureChange = async (e) => {
    // Cloudinary picture is Loading On
    setIsLoadingPicture(true);

    // upload the picture to cloudinary and receive the string for show the pic in the form
    const sendObj = new FormData();
    sendObj.append("picture", e.target.files[0]);

    try {
      const response = await uploadPictureService(sendObj);

      setPictureUrl(response.data.picture);
      // Cloudinary picture is Loading Off
      setIsLoadingPicture(false);
    } catch (error) {
      navigate("/error");
    }
  };

  // Send the input values to BE
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const productUpdate = {
      name: nameInput,
      price: priceInput,
      picture: pictureURL,
      size: sizeInput,
      description: descriptionInput,
      color: colorInput,
      stock: stockInput,
    };

    try {
      await updateProductService(productId, productUpdate);
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
