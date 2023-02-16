
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Burger from './Burger';
import logo from '../../images/logo-en-texto.png'
import '../../css/navbar.css'
const Nav = styled.nav`
  background-color: rgb(177, 177, 177);
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #f1f1f1;
  display: flex;
  justify-content: space-between;
  align-itemcs: center;

`

const Navbar = () => {
  return (
    <Nav>
      <div className='navbar'>

      <div className="logo">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      </div>
      <div>

      <Burger />
      </div>
      </div>
    </Nav>
  )
}

export default Navbar