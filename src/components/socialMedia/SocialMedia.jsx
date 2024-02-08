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

    console.log("popup",popUp)
  
  };

 


  return (
    <div className='socialMedia-container'>
      
    <div className='socialMedia-text'>   
      {popUp !== "" &&
       <p>{popUp}</p>
      }
    </div>
    <div className='socialMedia-links-container'>
      <a href="">
      <img src={instagramIcon} onMouseEnter={()=>setPopUp("Compartenos en instagram")} onMouseLeave={()=>setPopUp("")} alt="instagramIcon" />
    </a>
    <a href="">
      <img src={twitterIcon} onMouseEnter={()=>setPopUp("Compartenos en X")} onMouseLeave={()=>setPopUp("")} alt="twitterIcon" />
    </a>
    
    <a href="">
      <img src={telegramIcon} onMouseEnter={()=>setPopUp("Compartenos en Telegram")} onMouseLeave={()=>setPopUp("")} alt="telegramIcon" />
    </a>
    </div>
    
    </div>
  )
}

export default SocialMedia