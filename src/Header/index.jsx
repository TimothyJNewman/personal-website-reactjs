import './index.css';
import React, { useState } from "react";
import ButtonHeader from '../Components/ButtonHeader/index';
import Nav from '../DropdownMenu/index';
import SmoothCollapse from "react-smooth-collapse";
import logo from "../logo.svg";

function Header() {
  const [menuExpanded, toggleMenuExpansion] = useState(false);
  return (
    <div>
      <header className="App-header">
        <div className="App-header-wrapper">
          <button
              className="App-button-nav"
              aria-label="Toggle Menu"
              onClick={() => {
                toggleMenuExpansion(!menuExpanded);
              }}
            ><i className={`fa ${!menuExpanded ? "fa-bars" : "fa-caret-down"}`}></i>
            </button>
          <a href="/" >
          <div className="title-and-subtitle">
          <div className="header-logo-container"><img className="header-logo" src={logo} alt="logo"></img></div>
          <h1 className="App-title">
             Timothy Jabez <span className="App-title-surname"> Newman </span>
          </h1> 
          <h2 className="App-subtitle">Personal Website</h2>
          </div>
            </a>
        <div className="App-nav-header">
            <ButtonHeader 
              textValue = "Home"
              linkValue = "./"
            />
            <ButtonHeader 
              textValue = "About"
              linkValue = "./about"
            />
            <ButtonHeader 
              textValue = "Blog"
              linkValue = "./blog"
            />
            <ButtonHeader 
              textValue = "Projects"
              linkValue = "./projects"
            />
            <ButtonHeader 
              textValue = "Photos"
              linkValue = "./photos"
            />
            <ButtonHeader 
              textValue = "Contact"
              linkValue = "./contact"
            />
        </div>
          </div>
      </header>
      <SmoothCollapse expanded={menuExpanded} className="">
        <Nav />
      </SmoothCollapse>
    </div>      
  );
}

export default Header;
