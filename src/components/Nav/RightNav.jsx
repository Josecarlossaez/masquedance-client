// RightNav
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "../../css/rightNav.css";
// import cartIcon from "../../images/shopping-cart-outline-svgrepo-com.svg"

// Context
import { AuthContext } from "../../context/auth.context.js";
import { useContext } from "react"

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 1024px) {
    z-index:+1;
    flex-flow: column nowrap;
    background-color: #0d2538;
    position:fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    opacity:0.9;
    li {
      color: #fff;
    }
  }
`;

const RightNav = ( {open, changeStateBurger} ) => {
  const navigate = useNavigate();
  const {authenticateUser, isLoggedIn, user} = useContext(AuthContext)
  const handleChangeBurger = () =>{
    changeStateBurger()
  }
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/home");
  };
  return (
    
    <Ul open={open} className='links'>
       {/* <div></div> */}
      <div className="nav-list">
        <Link to='/'  onClick={handleChangeBurger}>Home</Link>
        <Link to='/about-us'>About Us</Link>
        <Link to='/list-blogs'>Blog</Link>
        <Link to='/list-tracks'>TRACKS</Link>
        <Link to='/list-djs'>DJ´S</Link>
        <Link to='/list-colections'  onClick={handleChangeBurger}>Merchandising</Link>
        {user?.user.role === "admin" && <Link to='/admin'>Admin</Link>}
        
      </div>
      <div className="auth-list">
        {!isLoggedIn && <Link to='/login' onClick={handleChangeBurger} style={{marginLeft:"20px", textDecoration:"underline"}}>Login</Link>}
        {isLoggedIn && <Link to='/' onClick={ handleLogout } style={{marginLeft:"20px", textDecoration:"underline"}}>Salir</Link>}
       
        
      </div>
      
    </Ul>
  );
};

export default RightNav;
