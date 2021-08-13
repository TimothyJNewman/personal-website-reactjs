import './index.css';
import Nav from '../DropdownMenu/index';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav-dropdown-container medium-col">
        <Nav />
      </div>
      <p className="footer-copyright">
        © 2021 Timothy Jabez Newman. All rights reserved.
        Source code can be viewed <a className="footer-link" href="https://github.com/TimothyJNewman/personal-website-reactjs"> here</a>
      </p>
    </footer>
  );
}

export default Footer;
