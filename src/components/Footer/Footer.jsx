import React from 'react'
import "../../css/Footer/footer.css"

import tiktokPeque from "../../images/brand-tiktok-sq-svgrepo-com.svg"
import instaPeque from "../../images/insta-peque.svg"
import xPeque from "../../images/x-peque.svg"
import twitchPeque from "../../images/twitch-peque.svg"
import youtPeque from "../../images/yout-peque.svg"
import logoPeque from "../../images/logoPeque.png";

import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer-container'>
          <div className="social-footer">
             <Link to="/">
              <img src={instaPeque} alt="logo" />
            </Link>

            <Link to="/">
              <img src={twitchPeque} alt="logo" />
            </Link>

            <Link to="/">
              <img src={tiktokPeque} alt="logo" />
            </Link>

            <Link to="/">
              <img src={youtPeque} alt="logo" />
            </Link>

            <Link to="/">
              <img src={xPeque} alt="logo" />
            </Link>
          </div>
          <div className='logo-center'>
           <Link to="/">
              <img src={logoPeque} alt="logo" />
           </Link>
          </div>
          <div className='contact'>
            <h4>Contacto</h4>
            <p>contacto@masqdance.com</p>
          </div>
    </div>
  )
}

export default Footer