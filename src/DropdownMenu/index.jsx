import './index.css';
import { Link } from "react-router-dom";

function Nav() {
  return (
      <div className="nav-dropdown">
      <button className="nav-button">
        <span className="nav-link">
        <Link to="./about">
          <i className="fa fa-angle-double-right nav-icon"></i> 
          About
        </Link>
        </span>
      </button>
      <button className="nav-button">
        <span className="nav-link">
        <Link to="./blog">
          <i className="fa fa-angle-double-right nav-icon"></i> 
          Blog
        </Link>
        </span>
      </button>
      <button className="nav-button">
        <span className="nav-link">
        <Link to="./projects">
          <i className="fa fa-angle-double-right nav-icon"></i> 
          Projects
        </Link>
        </span>
      </button>
      <button className="nav-button">
        <span className="nav-link">
        <Link to="./photos">
          <i className="fa fa-angle-double-right nav-icon"></i> 
          Photos
        </Link>
        </span>
      </button>
      <button className="nav-button">
        <span className="nav-link">
        <Link to="./contact">
          <i className="fa fa-angle-double-right nav-icon"></i> 
          Contact
        </Link>
        </span>
      </button>
      </div>
  );
}

export default Nav;