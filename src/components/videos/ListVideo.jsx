import React, { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";

import logo from "../../images/logo-en-texto.png"

// CSS
import "../../css/video/listVideo.css";

// Services
import { listVideoService } from "../../services/video.services";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

function ListVideo() {
  const navigate = useNavigate();
  const [videoList, setVideoList] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [open1, setOpen1] = useState(false)
  const [open2, setOpen2] = useState(false)
  const [open3, setOpen3] = useState(false)
  const [open4, setOpen4] = useState(false)
  const [open5, setOpen5] = useState(false)
  const [open6, setOpen6] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await listVideoService;
      setVideoList(response.data);
      setIsFetching(false);
    } catch (error) {
      navigate("/error");
    }
  };

  const handleOpen1 = () => {
    setOpen1(!open1)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
  }
  const handleOpen2 = () => {
    setOpen1(false)
    setOpen2(!open2)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
  }
  const handleOpen3 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(!open3)
    setOpen4(false)
    setOpen5(false)
    setOpen6(false)
  }
  const handleOpen4 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(!open4)
    setOpen5(false)
    setOpen6(false)
  }
  const handleOpen5 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(!open5)
    setOpen6(false)
  }
  const handleOpen6 = () => {
    setOpen1(false)
    setOpen2(false)
    setOpen3(false)
    setOpen4(false)
    setOpen5(false)
    setOpen6(!open6)
  }



  if (isFetching === true) {
    return <p>LOading...</p>;
  }

  return (
    <div className="listVideoComponent">
    <div className="title-component"> 
    
      <h1>LA LISTA  </h1>
      <img src={logo} alt="logo" /> 
    </div>
       <div className="list-video-container">
       <div className="vertical-order">
         <div className="video-container">
            <HashLink >
              <div onClick={handleOpen1}>
                <div className="info-video-container">
                  <div className="image-video">
                    <h1>1</h1>
                    <img src="https://www.discazos.com/store/1611-product_default/la-luna-when-the-morning-comestemazoooo.jpg" alt="" />
                  </div>
                  <div className="text-video">
                    <h2>LA LUNA - When the morning comes</h2>
                  </div>
                </div>

              </div>
            </HashLink>
            {
              open1 &&
              <div id="video-listVideo">
                <ReactPlayer className='reactPlayer'
                  url="https://www.youtube.com/watch?v=MLHukj6wZNg&t=6121s&ab_channel=masQDance"
                  config={{ youtube: { playerVars: { origin: window.location.origin } } }}
                  controls={true}
                  progress={true}
                />
              </div>
            }
          </div>
          <div className="video-container">
            <HashLink >
              <div onClick={handleOpen2}>
                <div className="info-video-container">
                  <div className="image-video">
                    <h1>2</h1>
                    <img src="https://www.discazos.com/store/1611-product_default/la-luna-when-the-morning-comestemazoooo.jpg" alt="" />
                  </div>
                  <div className="text-video">
                    <h2>LA LUNA - When the morning comes</h2>
                  </div>
                </div>

              </div>
            </HashLink>
            {
              open2 &&
              <div id="video-listVideo">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=MLHukj6wZNg&t=6121s&ab_channel=masQDance"
                  config={{ youtube: { playerVars: { origin: window.location.origin } } }}
                  controls={true}
                  progress={true}
                />
              </div>
            }
          </div>
          <div className="video-container">
            <HashLink >
              <div onClick={handleOpen3}>
                <div className="info-video-container">
                  <div className="image-video">
                    <h1>3</h1>
                    <img src="https://www.discazos.com/store/1611-product_default/la-luna-when-the-morning-comestemazoooo.jpg" alt="" />
                  </div>
                  <div className="text-video">
                    <h2>LA LUNA - When the morning comes</h2>
                  </div>
                </div>

              </div>
            </HashLink>
            {
              open3 &&
              <div id="video-listVideo">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=MLHukj6wZNg&t=6121s&ab_channel=masQDance"
                  config={{ youtube: { playerVars: { origin: window.location.origin } } }}
                  controls={true}
                  progress={true}
                />
              </div>
            }
          </div>
       </div>
       <div className="vertical-order">
        <div className="video-container">
            <HashLink >
              <div onClick={handleOpen4}>
                <div className="info-video-container">
                  <div className="image-video">
                    <h1>4</h1>
                    <img src="https://www.discazos.com/store/1611-product_default/la-luna-when-the-morning-comestemazoooo.jpg" alt="" />
                  </div>
                  <div className="text-video">
                    <h2>LA LUNA - When the morning comes</h2>
                  </div>
                </div>

              </div>
            </HashLink>
            {
              open4 &&
              <div id="video-listVideo">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=MLHukj6wZNg&t=6121s&ab_channel=masQDance"
                  config={{ youtube: { playerVars: { origin: window.location.origin } } }}
                  controls={true}
                  progress={true}
                />
              </div>
            }
          </div>
          <div className="video-container">
            <HashLink >
              <div onClick={handleOpen5}>
                <div className="info-video-container">
                  <div className="image-video">
                    <h1>5</h1>
                    <img src="https://www.discazos.com/store/1611-product_default/la-luna-when-the-morning-comestemazoooo.jpg" alt="" />
                  </div>
                  <div className="text-video">
                    <h2>LA LUNA - When the morning comes</h2>
                  </div>
                </div>

              </div>
            </HashLink>
            {
              open5 &&
              <div id="video-listVideo">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=MLHukj6wZNg&t=6121s&ab_channel=masQDance"
                  config={{ youtube: { playerVars: { origin: window.location.origin } } }}
                  controls={true}
                  progress={true}
                />
              </div>
            }
          </div>
          <div className="video-container">
            <HashLink >
              <div onClick={handleOpen6}>
                <div className="info-video-container">
                  <div className="image-video">
                    <h1>6</h1>
                    <img src="https://www.discazos.com/store/1611-product_default/la-luna-when-the-morning-comestemazoooo.jpg" alt="" />
                  </div>
                  <div className="text-video">
                    <h2>LA LUNA - When the morning comes</h2>
                  </div>
                </div>

              </div>
            </HashLink>
            {
              open6 &&
              <div id="video-listVideo">
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=MLHukj6wZNg&t=6121s&ab_channel=masQDance"
                  config={{ youtube: { playerVars: { origin: window.location.origin } } }}
                  controls={true}
                  progress={true}
                />
              </div>
            }
          </div>
       </div>
         
          
       </div>
    </div>

  

  );
}

export default ListVideo;
