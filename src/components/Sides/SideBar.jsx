import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData.jsx';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Logo from './Logo.png' //Tell Webpack this JS file uses this image
import 'bootstrap/dist/css/bootstrap.css';
import { NavbarBrand } from 'react-bootstrap';

const Nav = styled.div`
  background: #000000;
  height: 80px;
  display : flex;
  align-items: center;
  position : fixed;
  // position : relative;
  top : 0;
  left: 0;
  margin: 0;
  width: 100%;
  z-index : 1
`;

const NavIcon = styled(Link)`
  background: #000000;
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #000000;
  width: 23%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;


const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav className='main'>
          <Container className='col-1'>
            <NavIcon to='#'>
              <FaIcons.FaBars onClick={showSidebar}/>
            </NavIcon>
          </Container>
          <Container className='col-9' style={{ justifyContent: "flex-center"}}>
            <Navbar.Brand >
              <img
                alt="resturant-logo"
                src={Logo}
                width="60px"
                height="60px"
                className="d-inline-block align-top"
              />{' '}
              <h1 style={{ display: "inline", color: "white" }}>e-Dawat</h1>
            </Navbar.Brand>
          </Container>
          <Container className='col-2' style={{ justifyContent: "flex-end", marginBottom : "22px"}}>
            <Navbar.Toggle />
            <NavbarBrand className="justify-content-end" >
              <Navbar.Text style={{ color: "white", fontSize: "15px" }}>
                Signed in as: <a href="#login">Admin</a>
              </Navbar.Text>
              <>...</>
              <Button variant="danger" style={{ fontSize: "15px" }} href='#logout'
              onClick = {
                () => {
                  sessionStorage.setItem("isVerified", false);
                  navigate("/login");
                }
              }
              >Logout</Button>{' '}
            </NavbarBrand>
          </Container>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar}/>
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
            
            <br/><br /><br/><br /><br/><br /><br/><br /><br/><br /><br/><br />
            <h5>©Nidhi, 2023. All rights reserved❤</h5>
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </div>
  )
}

export default Sidebar;