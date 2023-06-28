import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// Services
import { uploadPictureService } from "../../services/upload.services";
import { createVideoService } from "../../services/video.services";

function CreateVideo() {
  const navigate = useNavigate();
  // input values
  const [linkInput, setLinkInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [djInput, setDjInput] = useState("");
  const [pictureURL, setPictureUrl] = useState("");

  // errorMessages from BE
  const [errorMessage, setErrorMessage] = useState("");

  // Takes product info
  const handleVideoLinkChange = (e) => setLinkInput(e.target.value);
  const handleVideoTitleChange = (e) => setLinkInput(e.target.value);
  const handleVideoDjChange = (e) => setLinkInput(e.target.value);

  // Cloudinary is Loading
  const [isLoadingPicture, setIsLoadingPicture] = useState(false);

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
  const handleCreateTwitchLink = async (e) => {
    e.preventDefault();

    const newVideo = {
      link: linkInput,
      title: titleInput,
      dj: djInput,
      picture: pictureURL,
    };

    try {
      await createVideoService(newVideo);
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

  return (
    <section className="general-container">
      <div className="form-container">
        <form>
          <h3>Crear Vídeo procedente de Youtube</h3>

          <div className="input-container">
            <input value={linkInput} onChange={handleVideoLinkChange} />
            <label className={linkInput && "filled"} htmlFor="link">
              Link
            </label>
          </div>
          {/*  */}

          <div className="input-container">
            <input value={titleInput} onChange={handleVideoTitleChange} />
            <label className={titleInput && "filled"} htmlFor="title">
              Title
            </label>
          </div>
          {/*  */}

          <div className="input-container">
            <input value={djInput} onChange={handleVideoDjChange} />
            <label className={djInput && "filled"} htmlFor="dj">
              Dj
            </label>
          </div>
          {/*  */}

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
          {/*  */}
          <button
            type="submit"
            onClick={handleCreateTwitchLink}
            className="general-btn"
          >
            Crear TwitchLink
          </button>
          {errorMessage !== "" && (
            <p className="error-message"> * {errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}
export default CreateVideo;
