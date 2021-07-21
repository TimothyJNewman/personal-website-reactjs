import './index.css';
import Nav from '../DropdownMenu/index';

function Footer() {
  return (
      <footer className="footer">
        <p className="footer-copyright">
          © 2021 Timothy Jabez Newman. All rights reserved.
        </p>
        <Nav></Nav>
      </footer>
  );
}

export default Footer;
