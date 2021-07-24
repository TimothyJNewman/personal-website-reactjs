import CoverImage from '../CoverImage/index';
import { Link } from "react-router-dom";
import Card from '../Components/Card/index';
import Query from "../Components/Query/QueryContent"
import gql from "graphql-tag";
import { useState, useEffect } from 'react';

const BlogAll = () => {

  const [currentArticleStart, setCurrentArticleStart] = useState(0);
  const [articleCount, setArticleCount] = useState();
  const [countError, setError] = useState(null);
  const BLOGPOST_QUERY = gql`
    query {
      blogposts(limit: 4, start: ${currentArticleStart}, sort: "published_at:desc") {
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
      fetch(APIURL + '/blogposts/count', {
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

  const handlePageNavClick = (navType) => {
    if (navType === -1) {
      if (currentArticleStart >= 4) {
        setCurrentArticleStart(currentArticleStart - 4);
      } else {
        setCurrentArticleStart(0);
      }
    } else if (navType === -2) {
      if (currentArticleStart + 4 < articleCount) {
        setCurrentArticleStart(currentArticleStart + 4);
      }
    } else {
      setCurrentArticleStart(4 * (navType - 1));
    }
  }

  const formatDate = (dateString) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  }

  const formatLink = (beginLink, endLink) => {
    return beginLink + endLink;
  }

  const navPageNumbers = () => {
    const items = [];
    for (var i = 1; i <= Math.ceil(articleCount / 4); i++) {
      items.push(
        <button className="posts-navigation-button" onClick={handlePageNavClick.bind(this, i)} key={i}>
          {i}
        </button>
      )
    }
    return items;
  }

  if (countError) {
    return <div className="error-message">An error occured: {countError.message}</div>;
  }
  return (
    <>
      <div className="medium-col">
        <CoverImage title="Recent Blog Posts" />
        <br />
        <Query query={BLOGPOST_QUERY}>
          {({ data: { blogposts }, error }) => {
            if (error) {
              return <div className="error-message">An error occured: {error.message}</div>;
            }
            return (
              <div className="card-container">
                {
                  blogposts.map(posts => (
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
                  ))
                }
              </div>
            );
          }}
        </Query>
        <div className="posts-navigation-container">
          <button className="posts-navigation-button" onClick={handlePageNavClick.bind(this, -1)}><i className="fa fa-arrow-circle-left"></i> Prev</button>
          {navPageNumbers()}
          <button className="posts-navigation-button" onClick={handlePageNavClick.bind(this, -2)}>Next <i className="fa fa-arrow-circle-right"></i></button>
        </div>
      </div>
    </>
  );
}

export default BlogAll;