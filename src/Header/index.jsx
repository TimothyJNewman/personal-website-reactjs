import './index.css';
import React, { useState } from "react";
import ButtonHeader from '../Components/ButtonHeader/index';
import Nav from '../DropdownMenu/index';
import SmoothCollapse from "react-smooth-collapse";
import logo from "../logo.svg";

function Header() {
  const [menuExpanded, toggleMenuExpansion] = useState(false);
  return (
    <div className="header-dropdownmenu-container">
      <header className="header">
        <div className="header-wrapper large-col">
          <button
            className="dropdown-burger"
            aria-label="Toggle Menu"
            onClick={() => {
              toggleMenuExpansion(!menuExpanded);
            }}
          ><i className={`fa dropdown-burger-symbol ${!menuExpanded ? "fa-bars" : "fa-caret-down"}`}></i>
          </button>
          <a href="/" >
            <div className="title-and-subtitle">
              <div className="header-logo-container"><img className="header-logo" src={logo} alt="logo"></img></div>
              <h1 className="title">
                Timothy Jabez <span className="title-surname"> Newman </span>
              </h1>
              <h2 className="subtitle">Personal Website</h2>
            </div>
          </a>
          <div className="nav-header">
            <ButtonHeader
              textValue="Home"
              linkValue="/"
            />
            <ButtonHeader
              textValue="About"
              linkValue="/about"
            />
            <ButtonHeader
              textValue="Blog"
              linkValue="/blog"
            />
            <ButtonHeader
              textValue="Projects"
              linkValue="/projects"
            />
            <ButtonHeader
              textValue="Photos"
              linkValue="/photos"
            />
            <ButtonHeader
              textValue="Contact"
              linkValue="/contact"
            />
          </div>
        </div>
      </header>
      <SmoothCollapse expanded={menuExpanded} className="nav-dropdown-container medium-col">
          <Nav />
      </SmoothCollapse>
    </div>
  );
}

export default Header;
