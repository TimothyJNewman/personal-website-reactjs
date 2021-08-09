import './index.css';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="nav-dropdown">
      <Link className="nav-link" to="/about">
        <i className="fa fa-angle-double-right nav-icon"></i>
        About
      </Link>
      <Link className="nav-link" to="/blog">
        <i className="fa fa-angle-double-right nav-icon"></i>
        Blog
      </Link>
      <Link className="nav-link" to="/projects">
        <i className="fa fa-angle-double-right nav-icon"></i>
        Projects
      </Link>
      <Link className="nav-link" to="/photos">
        <i className="fa fa-angle-double-right nav-icon"></i>
        Photos
      </Link>
      <Link className="nav-link" to="/contact">
        <i className="fa fa-angle-double-right nav-icon"></i>
        Contact
      </Link>
    </div>
  );
}

export default Nav;