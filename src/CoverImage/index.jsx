import './index.css';
import React,{ Component } from 'react';

class CoverImage extends Component {
  render() {
    return (
        <div className="cover-image-container">
          <div className="cover-image-title-container">
            <h2 className="cover-image-title">{this.props.title}</h2>
            {this.props.desc
            ? <p className="cover-image-desc">{this.props.desc}</p>
            : ""}
          </div>
          {this.props.src
            ? <img className="cover-image" src={this.props.src} alt='' />
            : <img className="cover-image" alt='' />}
        </div>
    )
  }
}

export default CoverImage;