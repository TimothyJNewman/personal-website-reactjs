import CoverImage from '../CoverImage/index';
import { Link } from "react-router-dom";
import Card from '../Components/Card/index';
import Query from "../Components/Query/QueryContent"
import gql from "graphql-tag";
import { useState, useEffect } from 'react';
import { getFormattedDate, getFormattedLink, getNavPageNumbers, getNewCurrentArticleStart } from '../Util/CommonUtils';

const ProjectAll = () => {

  const [currentArticleStart, setCurrentArticleStart] = useState(0);
  const [articleCount, setArticleCount] = useState();
  const [countError, setError] = useState(null);
  const PROJECTPOST_QUERY = gql`
    query {
      projectposts(limit: 4, start: ${currentArticleStart}, sort: "published_at:desc") {
        id
        title
        published_at
        slug
        summary
        tags {
          Tag
        }
      }
    }
  `;

  useEffect(() => {
    const APIURL = process.env.REACT_APP_BACKEND_URL;
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
      fetch(APIURL + '/projectposts/count', {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON)
        .then(e => {
          setArticleCount(e);
        });
    } catch (error) {
      setError({ error });
    }
  }, [countError]);

  const handlePageNavClick = (navCode) => {
    setCurrentArticleStart(getNewCurrentArticleStart(navCode, currentArticleStart, articleCount));
  }

  if (countError) {
    return <div className="error-message">An error occured: {countError.message}</div>;
  }
  return (
    <>
      <div className="medium-col">
        <CoverImage title="Recent Projects" />
        <br />
        <Query query={PROJECTPOST_QUERY}>
          {({ data, error }) => {
            if (error) {
              return <div className="error-message">An error occured: {error.message}</div>;
            }
            return (
              <div className="card-container content-text">
                {data.projectposts.length > 0
                ? data.projectposts.map(posts => (
                    <Link to={getFormattedLink("/projects/", posts.slug)} key={posts.id}>
                      <Card
                        title={posts.title}
                        img={posts.coverimage ? posts.coverimage.formats.medium.url : ""}
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
            );
          }}
        </Query>
        <div className="posts-navigation-container">
          <button className="posts-navigation-button" onClick={handlePageNavClick.bind(this, -1)}><i className="fa fa-arrow-circle-left"></i> Prev</button>
          {getNavPageNumbers(articleCount, handlePageNavClick)}
          <button className="posts-navigation-button" onClick={handlePageNavClick.bind(this, -2)}>Next <i className="fa fa-arrow-circle-right"></i></button>
        </div>
      </div>
    </>
  );
}

export default ProjectAll;