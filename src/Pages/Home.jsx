import React from "react";
import { Link } from "react-router-dom";
import Card from '../Components/Card/index';
import MarkdownView from 'react-showdown';
import Query from "../Components/Query/QueryContent"
import gql from "graphql-tag";
import { getFormattedDate, getFormattedLink } from "../Util/CommonUtils";

const Home = () => {

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

  return (
    <Query query={HOME_QUERY}>
      {({ data, error }) => {
        if (error) {
          return <div className="error-message">An error occured: {error.message}</div>;
        }
        return (
          <div className="home">
            <div className="medium-col">
              <div className="blog-intro">
                <div className="intro-container">
                  <div className="welcome-text-and-socials">
                    {data.welcomenote
                    ? <MarkdownView className="markdown-text"
                        markdown={data.welcomenote.welcometext}
                        options={{ tables: true, emoji: true, noHeaderId: true }}
                      />
                    : ""
                    }
                    <div className="social-media-icon-container">
                      {data.socialmedias
                        ? data.socialmedias.map(media => (
                          <a href={media.link} key={media.id}><img src={media.image} alt={media.name} /></a>
                        ))
                        : ""
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="medium-col">
              <br />
              <h2 className="blog-postlist-title">Recent Projects</h2>
              <div className="card-container">
                {data.projectposts
                  ? data.projectposts.map(posts => (
                    <Link to={getFormattedLink("/projects/", posts.slug)} key={posts.id}>
                      <Card
                        img={posts.coverimage ? posts.coverimage.formats.medium.url : ""}
                        title={posts.title}
                        date={getFormattedDate(posts.published_at)}
                        description={posts.summary}
                        tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                        tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                        tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                      />
                    </Link>
                  ))
                  : <p className="error-message">No projects found</p>
                }
              </div>
              <p className="card-readmore">
                <Link to="/projects">Explore all projects <i className="fa fa-arrow-right"></i></Link>
              </p>
            </div>
            <div className="medium-col">
              <h2 className="blog-postlist-title">Recent Blog Posts</h2>
              <div className="card-container">
                {data.blogposts
                  ? data.blogposts.map(posts => (
                    <Link to={getFormattedLink("/blog/", posts.slug)} key={posts.id}>
                      <Card
                        title={posts.title}
                        date={getFormattedDate(posts.published_at)}
                        description={posts.summary}
                        tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                        tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                        tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                      />
                    </Link>
                  ))
                  : <p className="error-message">No blog posts found</p>
                }
              </div>
              <p className="card-readmore">
                <Link to="/blog">Read all blog posts <i className="fa fa-arrow-right"></i></Link>
              </p>
            </div>
            <div className="medium-col">
              <h2 className="blog-postlist-title">All Tags</h2>
              <div className="card-tag-container-tagpage">
                {data.tags
                  ? data.tags.map(elem => (
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