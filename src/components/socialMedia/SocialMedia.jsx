import React from 'react'
import { useState } from "react"

// CSS
import  "../../css/home.css"

// IMAGES
import twitchIcon from "../../images/twitch.svg"
import facebookIcon from "../../images/facebook.svg"
import youtubeIcon from "../../images/youtube.svg"
import twitterIcon from "../../images/twitter.svg"
import instagramIcon from "../../images/instagram.svg"
import tiktokIcon from "../../images/tiktok.svg"
import telegramIcon from "../../images/telegram.svg"

function SocialMedia() {
  const [popUp, setPopUp] = useState("")

  const showPopup = (e) => {
    e.preventDefault()
    setPopUp(e.target.value);
    console.log("popup",popUp)
    console.log("e.tr-val", e.target.value);
  };

 


  return (
    <div className='socialMedia-container'>
      
      {popUp !== "" &&
    <div className='socialMedia-text'>   
       <p>{popUp}</p>
    </div>
      }
    <div className='socialMedia-links-container'>
      <a href="">
      <img src={instagramIcon} value="Compártenos en Instagram" onMouseEnter={showPopup} onMouseLeave={()=>setPopUp("")} alt="instagramIcon" />
    </a>
    <a href="">
      <img src={twitterIcon} alt="twitterIcon" />
    </a>
    <a href="">
      <img src={twitchIcon} alt="twitchIcon" />
    </a>
    
    <a href="">
      <img src={youtubeIcon} alt="youtubeIcon" />
    </a>
    <a href="">
      <img src={tiktokIcon} alt="tiktokIcon" />
    </a>
    <a href="">
      <img src={telegramIcon} alt="telegramIcon" />
    </a>
    </div>
    
    </div>
  )
}

export default SocialMedia