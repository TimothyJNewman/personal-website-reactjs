import React from "react";
import { Link } from "react-router-dom";
import Card from '../Components/Card/index';
import MarkdownView from 'react-showdown';
import Query from "../Components/Query/QueryContent"
import gql from "graphql-tag";

const Home = () => {

  const APIURL = process.env.REACT_APP_BACKEND_URL;
  const HOME_QUERY = gql`
    query HomeQuery {
      projectposts(limit: 4, sort: "published_at:desc") {
        id
        title
        coverimage{
          formats
        }
        published_at
        slug
        summary
        tags {
          Tag
        }
      }
      blogposts(limit: 4, sort: "published_at:desc") {
        id
        title
        published_at
        slug
        summary
        tags {
          Tag
        }
      }
      welcomenote {
        welcometext
      }
      socialmedias(sort: "order:asc") {
        id
        link
        image
        order
      }
      tags {
        Tag
      }
    }
  `;

  const formatDate = (dateString) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  }

  const formatLink = (beginLink, endLink) => {
    return beginLink + endLink;
  }

  return (
    <Query query={HOME_QUERY}>
      {({ data: { projectposts, blogposts, welcomenote, socialmedias, tags }, error }) => {
        if (error) {
          return <div className="error-message">An error occured: {error.message}</div>;
        }
        return (
          <div className="home">
            <div className="medium-col">
              <div className="blog-intro">
                <div className="intro-container">
                  <div className="welcome-text-and-socials">
                    <MarkdownView className="markdown-text"
                      markdown={welcomenote.welcometext}
                      options={{ tables: true, emoji: true, noHeaderId: true }}
                    />
                    <div className="social-media-icon-container">
                      {socialmedias.map(media => (
                        <a href={media.link} key={media.id}><img src={media.image} alt={media.name} /></a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="medium-col">
              <br />
              <h2 className="blog-postlist-title">Recent Projects</h2>
              <div className="card-container">
                {projectposts.map(posts => (
                  <Link to={formatLink("/projects/", posts.slug)} key={posts.id}>
                    <Card
                      img={posts.coverimage ? APIURL + posts.coverimage.formats.medium.url : ""}
                      title={posts.title}
                      date={formatDate(posts.published_at)}
                      description={posts.summary}
                      tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                      tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                      tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                    />
                  </Link>
                ))}
              </div>
              <p className="card-readmore">
                <Link to="/projects">Explore all projects <i className="fa fa-arrow-right"></i></Link>
              </p>
            </div>
            <div className="medium-col">
              <h2 className="blog-postlist-title">Recent Blog Posts</h2>
              <div className="card-container">
                {blogposts.map(posts => (
                  <Link to={formatLink("/blog/", posts.slug)} key={posts.id}>
                    <Card
                      title={posts.title}
                      date={formatDate(posts.published_at)}
                      description={posts.summary}
                      tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                      tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                      tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                    />
                  </Link>
                ))}
              </div>
              <p className="card-readmore">
                <Link to="/blog">Read all blog posts <i className="fa fa-arrow-right"></i></Link>
              </p>
            </div>
            <div className="medium-col">
                <h2 className="blog-postlist-title">All Tags</h2>
                <div className="card-tag-container-tagpage">
                  {tags
                    ? tags.map(elem => (
                      <Link to={"/tag/" + elem.Tag} key={elem.Tag} className="card-tag-link"><div className="card-tag">{elem.Tag} </div></Link>
                    ))
                    : <p className="error-message">No tags found</p>
                  }
                </div>
              </div>
          </div>
        )
      }}
    </Query>
  );
}

export default Home;