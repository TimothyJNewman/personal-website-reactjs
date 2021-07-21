import React from "react";
import CoverImage from '../CoverImage/index';
import { Link } from "react-router-dom";
import Card from '../Components/Card/index';
import '../Content/index.css'

const apiUrl = process.env.REACT_APP_BACKEND_URL;

class Photos extends React.Component {
    // State of your application
    constructor(props){
      super(props);
      this.state = {
        currentArticleStart: 0,
        totalNoOfArticles: 0,
        blogPostContent: [],
        listOfBlogPosts: [],
        displayAll: false,
        error: null,
      };
      this.handlePageNavClick = this.handlePageNavClick.bind(this);
    }
  
    handlePageNavClick(navType){
      var newArticleStart = this.state.currentArticleStart;
      if (navType === -1){
        if (this.state.currentArticleStart >= 4){
          newArticleStart -= 4;
        }else{
          newArticleStart = 0;
        }
      }else if(navType === -2){
        if (this.state.currentArticleStart + 4 < this.state.totalNoOfArticles ){
          newArticleStart += 4;
        }
      }else{
        newArticleStart = 4 * (navType - 1);
      }
      this.setState(prevState => ({
            currentArticleStart: newArticleStart
          }), () => {
            this.updateArticleCards();
         }); 
    }

    returnApiSlugURL(){
      var url = new URL(window.location.href);
      return url.searchParams.get('slug');    
    }
  
    formatDate = (dateString) => {
      var options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString([],options);
    }
    
    formatLink = (beginLink,endLink) => {
      return beginLink + endLink;
    }
    
    navPageNumbers = () => {
      const items = [];
      for(var i = 1; i <= Math.ceil(this.state.totalNoOfArticles/4); i++){
        items.push(
          <button className="posts-navigation-button" onClick={this.handlePageNavClick.bind(this,i)} key={i}>
            {i}
          </button>
        )
      }
      return items;
    }
    
    componentDidUpdate = () => {
      console.log(      
          "currentArticleStart",this.state.currentArticleStart,
          "\ntotalNoOfArticles",this.state.totalNoOfArticles,
          "\nblogPostContent.id",this.state.blogPostContent.id,
          "\nlistOfBlogPosts.id",this.state.listOfBlogPosts.id,
          "\ndisplayAll",this.state.displayAll,
          "\nerror",this.state.error
      );
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
      if(this.returnApiSlugURL() == null){
        const totalNoOfArticles = await fetch(apiUrl+'/galleries/count', {
        method: 'GET',
        headers: headers,
        })
        .then(checkStatus)
        .then(parseJSON);
        const listOfBlogPosts = await fetch(apiUrl+'/galleries?_limit=4&_sort=published_at:DESC&_start='+this.state.currentArticleStart, {
          method: 'GET',
          headers: headers,
        })
        .then(checkStatus)
        .then(parseJSON);
        this.setState({ totalNoOfArticles, listOfBlogPosts, displayAll: true });
      }else{
        const blogPostContent = await fetch(apiUrl+'/galleries?slug='+this.returnApiSlugURL(), {
          method: 'GET',
          headers: headers,
        })
      .then(checkStatus)
      .then(parseJSON);
      this.setState({ blogPostContent });
      }
    }catch (error) {
      this.setState({ error });
    }
  };

  updateArticleCards = async () => {
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
      if(this.returnApiSlugURL() == null){
        await fetch(apiUrl+'/galleries?_limit=4&_sort=published_at:DESC&_start='+this.state.currentArticleStart, {
        method: 'GET',
        headers: headers,
      })
      .then(checkStatus)
      .then(parseJSON)
      .then(e => {
        this.setState({ listOfBlogPosts: e, displayAll: true })
        });
      }
    }catch(error) {
      this.setState({ error });
    }
    window.scrollTo(0, 280);
  }
  
  render(){
  const error = this.state.error;
    // Print errors if any
  if (error) {
      return <div className="error-message">An error occured: {error.message}</div>;
  }
  if (this.state.displayAll){
      return (
        <>
          <div className="large-col">
            <CoverImage title="Photo Gallery" />
            <br />
            <div className="Card-container-gallery">
              {         
                this.state.listOfBlogPosts.map(posts => (
                <Link to={this.formatLink("/photos?slug=", posts.slug)} key={posts.id}>
                  <Card 
                    img={posts.coverimage ? apiUrl+posts.coverimage.formats.medium.url : ""}
                    title={posts.title}
                    date={this.formatDate(posts.published_at)}
                    description={posts.summary}      
                  />
                </Link>
              ))
              }
            </div>
            <div className="posts-navigation-container">
                <button className="posts-navigation-button" onClick={this.handlePageNavClick.bind(this,-1)}><i className="fa fa-arrow-circle-left"></i> Prev</button>
                {this.navPageNumbers()}
                <button className="posts-navigation-button" onClick={this.handlePageNavClick.bind(this,-2)}>Next <i className="fa fa-arrow-circle-right"></i></button>
            </div>
          </div>
        </>
  );
  
  }else{
      return (
        <>
          {this.state.blogPostContent.map(posts => (
          <div key={posts.id}>
            {posts.coverimage 
               ? <CoverImage src={apiUrl+posts.coverimage.formats.medium.url} title={posts.title}/>
                : <CoverImage title={posts.title}/>}
            <div className="contentWrapper">    
              <div className="article-date-and-tags">
              <p className="article-date">{this.formatDate(posts.published_at)}</p>
              </div>
            </div>
            <p className="Card-readmore">
              <Link to="./photos">Explore all galleries <i className="fa fa-arrow-right"></i></Link>
            </p>
          </div>
          ))}

        </>
      );
  }

}
}

export default Photos;