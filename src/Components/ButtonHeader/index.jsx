import React from 'react';
import './index.css';
import { Link } from "react-router-dom";

class ButtonHeader extends React.Component {
  render(){
    return (
      <Link to={this.props.linkValue}>
        <button className="button-header">
          {this.props.textValue}  
        </button>
      </Link>

    );
  }
}

export default ButtonHeader;
