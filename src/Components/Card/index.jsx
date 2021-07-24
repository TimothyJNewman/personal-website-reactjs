import './index.css';
import React,{ Component } from 'react';
import { Link } from "react-router-dom";

class Card extends Component {
  render() {
    return (
        <>
            <div className="card">
              {this.props.img !== undefined && <img className="card-image" src={this.props.img} alt='' />}
              <div className="card-contents">
                <div>
                  <h3 className="card-heading">{this.props.title}</h3>
                  <p className="card-date"> {this.props.date}</p>
                  <p className="card-body"> {this.props.description}</p>
                </div>
                <div className="card-tag-container">
                  {this.props.tag1 ? <Link to={"/tag/"+this.props.tag1}><div className="card-tag">{this.props.tag1}</div></Link> : ""}
                  {this.props.tag2 ? <Link to={"/tag/"+this.props.tag2}><div className="card-tag">{this.props.tag2}</div></Link> : ""}
                  {this.props.tag3 ? <Link to={"/tag/"+this.props.tag3}><div className="card-tag">{this.props.tag3}</div></Link> : ""}
                </div>
              </div>
            </div>
        </>
    )
}
}

export default Card;