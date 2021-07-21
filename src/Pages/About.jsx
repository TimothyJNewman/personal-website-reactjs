import React from "react";
import MarkdownView from 'react-showdown';
import CoverImage from '../CoverImage/index';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

class About extends React.Component {
  // State of your application
  state = {
    content: {},
    error: null,
  };

  componentDidMount = async () => {
    // Parses the JSON returned by a network request
    const parseJSON = resp => (resp.json ? resp.json() : resp);

    // Checks if a network request came back fine, and throws an error if not
    const checkStatus = resp => {
      if (resp.status >= 200 && resp.status < 300) {
        return resp;
      }
      return parseJSON(resp).then(resp => {
        throw resp;
      });
    };
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
          const content = await fetch(apiUrl+'/aboutpagecontent', {
          method: 'GET',
          headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      this.setState({ content });
      this.setState({ displayAll: true })
    }catch (error) {
      this.setState({ error });
    }
  };

  render(){
    const error = this.state.error;
      // Print errors if any
    if (error) {
        return <div>An error occured: {error.message}</div>;
    }
    return (
      <>
        <div>
          {this.state.content.coverimage 
             ? <CoverImage src={apiUrl+this.state.content.coverimage.formats.medium.url} title={this.state.content.title}/>
              : <CoverImage title={this.state.content.title}/>}
          <div className="contentWrapper">    
            <div className="markdown-text">
            <MarkdownView
              markdown={this.state.content.content}
              options={{ emoji: true, noHeaderId: true, strikethrough: true}}
            />
            </div>
          </div>
        </div>
      </>
    );
  }

}

export default About;