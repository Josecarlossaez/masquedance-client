import React from 'react'
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


  return (
    <div className='socialMedia-links-container'>
    <a href="">
      <img src={instagramIcon} alt="instagramIcon" />
    </a>
    <a href="">
      <img src={twitterIcon} alt="twitterIcon" />
    </a>
    <a href="">
      <img src={twitchIcon} alt="twitchIcon" />
    </a>
    <a href="">
      <img src={facebookIcon} alt="facebookIcon" />
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
  )
}

export default SocialMedia