import CoverImage from '../CoverImage/index';
import { Link } from "react-router-dom";
import Card from '../Components/Card/index';
import Query from "../Components/Query/QueryContent"
import gql from "graphql-tag";
import { useState, useEffect } from 'react';
import { getFormattedDate, getFormattedLink, getNavPageNumbers, getNewCurrentArticleStart } from "../Util/CommonUtils";

const PhotosAll = () => {

  const [currentArticleStart, setCurrentArticleStart] = useState(0);
  const [articleCount, setArticleCount] = useState();
  const [countError, setError] = useState(null);
  const PHOTOS_QUERY = gql`
    query {
      galleries(limit: 4, start: ${currentArticleStart}, sort: "published_at:desc") {
        id
        coverimage {
          formats
        }
        title
        slug
        published_at
        images {
          formats
        }
      }
    }
    `;
  
  // Effect hook to fetch gallery count and set state
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
      fetch(APIURL + '/galleries/count', {
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

  // Error message if gallery count cannot be obtained from API
  if (countError) {
    return <div className="error-message">An error occured: {countError.message}</div>;
  }
  return (
    <>
      <div className="medium-col">
        <CoverImage title="Photo Gallery" />
        <br />
        <Query query={PHOTOS_QUERY}>
          {({ data, error }) => {
            if (error) {
              return <div className="error-message">An error occured: {error.message}</div>;
            }
            return (
              <div className="card-container-gallery content-text">
                {data.galleries.length > 0
                  ? data.galleries.map(posts => (
                    <Link to={getFormattedLink("/photos/", posts.slug)} key={posts.id}>
                      <Card
                        img={posts.coverimage ? posts.coverimage.formats.medium.url : ""}
                        title={posts.title}
                        date={getFormattedDate(posts.published_at)}
                        description={posts.description}
                      />
                    </Link>
                  ))
                  : <p className="error-message">No galleries found</p>
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

export default PhotosAll;