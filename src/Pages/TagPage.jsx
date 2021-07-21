import React from "react";
import { Link } from "react-router-dom";
import Card from '../Components/Card/index';
import CoverImage from '../CoverImage/index';

const apiUrl = process.env.REACT_APP_BACKEND_URL;

class TagPage extends React.Component {
    // State of your application
    state = {
      projectPosts: [],
      blogPosts: [],
      tagList: [],
      projectError: null,
      blogError: null,
      tagError: null,
    };

  formatDate = (dateString) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([],options);
  }
  
  formatLink = (beginLink,endLink) => {
    return beginLink + endLink;
  }
  
  returnApiSlugURL(){
    var url = new URL(window.location.href);
    return url.searchParams.get('tag');    
  }
  
  parser = new DOMParser();
    
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
    if (this.returnApiSlugURL() != null){
    try {
      const projectPosts = await fetch(apiUrl+'/projectposts?_limit=10&_sort=published_at:DESC&tags.Tag_eq='+this.returnApiSlugURL(), {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      this.setState({ projectPosts });
    } catch (projectError) {
      this.setState({ projectError });
    }
    try{
      const blogPosts = await fetch(apiUrl+'/blogposts?_limit=10&_sort=published_at:DESC&tags.Tag_eq='+this.returnApiSlugURL(), {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      this.setState({ blogPosts });
    }catch(blogError){
      this.setState({ blogError });
    }
    }
    try {
      const tagList = await fetch(apiUrl+'/tags', {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      this.setState({ tagList });
    } catch (tagError) {
      this.setState({ tagError });
    }
  };

  render(){
    const projectError = this.state.projectError;
    const blogError = this.state.blogError;
    const tagError = this.state.tagError;
    
    if (tagError) {
        return <div className="error-message">An error occured: {tagError.message}</div>;
    }

  return (
    <>
    <CoverImage title={"Tag: "+this.returnApiSlugURL()} desc={" | Projects: "+this.state.projectPosts.length+" | Blog: "+this.state.blogPosts.length} />
      <div className="medium-col">
        <h2 className="blog-postlist-title">Recent Projects</h2>
        {projectError ? <p className="error-message">No projects found</p> :""}
        <div className="Card-container">
          {         this.state.projectPosts.map(posts => (
            <Link to={this.formatLink("/Projects?slug=",posts.slug)} key={posts.id}>
            <Card
            img={posts.CoverImage ? apiUrl+posts.CoverImage.formats.medium.url : ""}
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
          <Link to="./Projects">Explore all projects <i className="fa fa-arrow-right"></i></Link>
        </p>
      </div>
      <div className="medium-col">
        <h2 className="blog-postlist-title">Recent Blog Posts</h2>
        {blogError ? <p className="error-message">No blog posts found</p> :""}
        <div className="Card-container">
          {         this.state.blogPosts.map(posts => (
            <Link to={this.formatLink("/Blog?slug=",posts.slug)} key={posts.id}>
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
          <Link to="./Blog">Read all blog posts <i className="fa fa-arrow-right"></i></Link>
        </p>
      </div>
    <div className="medium-col">
      <h2 className="blog-postlist-title">All Tags</h2>
      <div className="card-tag-container-tagpage">
    {this.state.tagList.map(elem => (
      <Link to={"/tagpage?tag="+elem.Tag} key={elem.id} className="card-tag-link"><div className="card-tag">{elem.Tag} </div></Link>))}
      {tagError ? <p className="error-message">No tags found</p> :""}
      </div>
    </div>
    </>
  );
}
}

export default TagPage;