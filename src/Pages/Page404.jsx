import React from "react";
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
              ? `The requested url is not available. `
              : `The requested url <a href=${window.location.href}>${window.location.href}</a> is not available. `
              }Please <a href="/">click here</a> to return to the home page.</p>
          </div>
        </div>
      </>
    );
  }

}

export default Page404;