import './index.css';
import Nav from '../DropdownMenu/index';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav medium-col">
        <Nav />
      </div>
      <p className="footer-copyright">
        © 2021 Timothy Jabez Newman. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
