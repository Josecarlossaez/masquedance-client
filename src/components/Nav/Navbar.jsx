import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Burger from "./Burger";
import logo from "../../images/logo-en-texto.png";
import logoPeque from "../../images/logoPeque.png";
import userLogo from "../../images/user_icon.svg";
import cartLogo from "../../images/shopping-cart-outline-svgrepo-com.svg";
import "../../css/navbar.css";


// Context
import { AuthContext } from "../../context/auth.context.js";
import { useContext } from "react";

const Nav = styled.nav`
  position: fixed
  ${"" /* margin-top: -140px; */}
  padding: 0px 0 10px 0;
  background-color: white;
  width: 100%;
  height: 60px;
  ${'' /* border: 2px solid black; */}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Navbar = () => {
  const { authenticateUser, isLoggedIn, user } = useContext(AuthContext);

  return (
    <Nav className="Nav">
      {/* <div className="nav-container"> */}
        <div className="space-logo-user">
          <div className="space"></div>
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="user">
          <div>
          
            <img src={userLogo} alt="userLogo" />
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
          <div className="logo-peque">
             <Link to="/">
              <img src={logoPeque} alt="logo" />
            </Link>
          </div>
          <div></div>
            
           
          </div>
        </div>
        <div className="navbar">
          <div>
            <Burger />
          </div>
        </div>
      {/* </div> */}
    </Nav>
  );
};

export default Navbar;
