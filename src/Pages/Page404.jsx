import React from "react";
import { Link } from "react-router-dom";
import CoverImage from '../CoverImage/index';

class Page404 extends React.Component {
  render() {
    return (
      <>
        <div>
          <CoverImage title="You've reached a dead end!" />
          <div className="content-wrapper">
            <h2>404 Error</h2>
            <p>
              {window.location.pathname === "/page404"
            ? <>The requested url is not available. </>
            : <>The requested url <Link to={window.location.href}>{window.location.href}</Link> is not available. </>
              }Please <Link to="/">click here</Link> to return to the home page.</p>
          </div>
        </div>
      </>
    );
  }

}

export default Page404;