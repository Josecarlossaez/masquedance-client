// RightNav
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../css/rightNav.css";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 10px;
  }
  @media (max-width: 1024px) {
    flex-flow: column nowrap;
    background-color: #0d2538;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`;

const RightNav = ({ open }) => {
  return (
    <Ul open={open} className='links'>
      <div className="nav-list">
        <Link to='/'>Home</Link>
        <Link to='/about'>About Us</Link>
        <Link to='/records'>+QDance Records</Link>
        <Link to='/sesiones'>Sesiones</Link>
        <Link to='/merchandising'>Merchandising</Link>
      </div>
      <div className="auth-list">
        <Link to='/signup'>Sign Up</Link>
        <Link>Login</Link>
        <Link>Logout</Link>
      </div>
    </Ul>
  );
};

export default RightNav;
