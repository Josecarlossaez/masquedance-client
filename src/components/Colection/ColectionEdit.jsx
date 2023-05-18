import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailsColectionService, updateColectionService } from "../../services/colection.services";
import { uploadPictureService } from "../../services/upload.services";
import { AuthContext } from "../../context/auth.context";

function ColectionEdit() {
  const { colectionId } = useParams;
  const navigate = useNavigate();

  
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
    const response = await detailsColectionService(colectionId);
    setDetails(response.data);
    setIsFetching(false);
    const { name, price, picture } =
      response.data;
    setName(name);
    setPrice(price);
    setPictureUrl(picture);
  };

  // TAKES NEW COLECTION INFO
  const handleNameChange = (e) => setName(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
   // LOAD PICTURE ON CLOUDINARY
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

  // UPDATE COLECTION
  const handleUpdateColection = async (e) => {
    e.preventDefault();

    const colectionUpdate = {
      name: nameInput,
      price: priceInput,
      picture: pictureURL
    };

    try {
      await updateColectionService(colectionId, colectionUpdate);
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
      </form>
    </div>
  </section>

  );
}

export default ColectionEdit;
