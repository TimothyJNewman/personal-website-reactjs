import React from "react";
import { Link } from "react-router-dom";
import './Home.css';
import Card from '../Components/Card/index';
import MarkdownView from 'react-showdown';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

class Home extends React.Component {
    // State of your application
    state = {
      welcomeNote: "",
      socialMedias: [],
      projectPosts: [],
      blogPosts: [],
      error: null,
    };

  formatDate = (dateString) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([],options);
  }
  
  formatLink = (beginLink,endLink) => {
    return beginLink + endLink;
  }
    
    // Fetch your restaurants immediately after the component is mounted
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
      const projectPosts = await fetch(apiUrl+'/projectposts?_limit=4&_sort=published_at:DESC', {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      const blogPosts = await fetch(apiUrl+'/blogposts?_limit=4&_sort=published_at:DESC', {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      const welcomeNote = await fetch(apiUrl+'/welcomenote', {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      const socialMedias = await fetch(apiUrl+'/socialmedias?_sort=order:ASC', {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      this.setState({ projectPosts });
      this.setState({ blogPosts });
      this.setState({ welcomeNote });
      this.setState({ socialMedias });
    } catch (error) {
      this.setState({ error });
    }
  };

  render(){
    const error = this.state.error;

    // Print errors if any
    if (error) {
      return <div className="error-message">An error occured: {error.message}</div>;
    }
  return (
    <div className="home">
      <div className="medium-col">
      <div className="App-blog-intro">
          <div className="intro-container"> 
          <div className="welcome-text-and-socials">
          <MarkdownView className="markdown-text"
                    markdown={this.state.welcomeNote.welcometext}
                    options={{ tables: true, emoji: true, noHeaderId: true }}
                  />  
            <div className="social-media-icon-container">
          {         this.state.socialMedias.map(media => (
                <a href={media.link} key={media.id}><img src={media.image} alt={media.name}/></a>
          ))}
            </div>
            </div>
          </div>
      </div>
      </div>
      <div className="medium-col">
        <br />
        <h2 className="App-blog-postlist-title">Recent Projects</h2>
        <div className="Card-container">
          {         this.state.projectPosts.map(posts => (
            <Link to={this.formatLink("/projects?slug=",posts.slug)} key={posts.id}>
            <Card
            img={posts.coverimage ? apiUrl+posts.coverimage.formats.medium.url : ""}
            title={posts.title}
            date={this.formatDate(posts.published_at)}
            description={posts.summary}      
            tag1={posts.tags[0] ? posts.tags[0].Tag : false}
            tag2={posts.tags[1] ? posts.tags[1].Tag : false}
            tag3={posts.tags[2] ? posts.tags[2].Tag : false}
            />
            </Link>
          ))}
        </div>
        <p className="Card-readmore">
          <Link to="./projects">Explore all projects <i className="fa fa-arrow-right"></i></Link>
        </p>
      </div>
      <div className="medium-col">
        <h2 className="App-blog-postlist-title">Recent Blog Posts</h2>
        <div className="Card-container">
          {         this.state.blogPosts.map(posts => (
            <Link to={this.formatLink("/blog?slug=",posts.slug)} key={posts.id}>
            <Card 
            title={posts.title}
            date={this.formatDate(posts.published_at)}
            description={posts.summary}      
            tag1={posts.tags[0] ? posts.tags[0].Tag : false}
            tag2={posts.tags[1] ? posts.tags[1].Tag : false}
            tag3={posts.tags[2] ? posts.tags[2].Tag : false}
            />
            </Link>
          ))}
        </div>
        <p className="Card-readmore">
          <Link to="./blog">Read all blog posts <i className="fa fa-arrow-right"></i></Link>
        </p>
      </div>
    </div>
  );
}
}

export default Home;