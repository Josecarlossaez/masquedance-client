import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Burger from "./Burger";
import logo from "../../images/logo-en-texto.png";
import userLogo from "../../images/user_icon.svg";
import cartLogo from "../../images/shopping-cart-outline-svgrepo-com.svg";
import tiktokPeque from "../../images/brand-tiktok-sq-svgrepo-com.svg"
import instaPeque from "../../images/insta-peque.svg"
import xPeque from "../../images/x-peque.svg"
import twitchPeque from "../../images/twitch-peque.svg"
import youtPeque from "../../images/yout-peque.svg"

import "../../css/navbar.css";


// Context
import { AuthContext } from "../../context/auth.context.js";
import { useContext } from "react";

const Nav = styled.nav`
  position: fixed
  ${"" /* margin-top: -140px; */}
  padding: 0px 0 10px 0;
  background-color:#f0f8f7;
  width: 100%;
  height: 100%;
  ${'' /* border: 2px solid black; */}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => {
  const { authenticateUser, isLoggedIn, user } = useContext(AuthContext);

  return (
    <div className="main-nav-container">
      <Nav className="main-nav">
        <div className="social-logo-user">
          <div className="social">
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
                {/*  */}
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
            {/*  */}
          <div className="user">
            <div>
              {isLoggedIn ?

                <Link to="/account">
                  <img src={userLogo} alt="userLogo" />
                </Link>
                :
                <Link to="/login">
                  <img src={userLogo} alt="userLogo" />
                </Link>
              }


              {isLoggedIn ?

                <Link to="/cart">
                  <img src={cartLogo} alt="cart-icon" />
                </Link>
                :
                <Link to="/login">
                  <img src={cartLogo} alt="cart-icon" />
                </Link>
              }
            </div>
          </div>
        </div>
      </Nav>
        <div className="social-1024">
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
      <div className="navbar">
        <div>
          <Burger />
        </div>
      </div>

    </div>

  );
};

export default Navbar;
