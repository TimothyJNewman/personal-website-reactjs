import { useParams } from "react-router";
import MarkdownView from 'react-showdown';
import { Link } from "react-router-dom";
import CoverImage from '../CoverImage/index';
import Query from "../Components/Query/QueryContent";
import gql from "graphql-tag";

const Blog = () => {
  let { slug } = useParams();
  const APIURL = process.env.REACT_APP_BACKEND_URL;
  const BLOGPOST_CONTENT_QUERY = gql`
    query BlogPost($slug: String!){
      blogposts( where: {slug: $slug }) {
        id
        coverimage{
          formats
        }
        title
        content
        published_at
        tags {
          Tag
        }
      }
    }
  `;

  const formatDate = (dateString) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString([], options);
  }

  return (
    <>
      <Query query={BLOGPOST_CONTENT_QUERY} slug={slug}>
        {({ data: { blogposts }, error }) => {
          if (error) {
            if (error.message === "Cannot read property 'content' of undefined") {
              return <div className="error-message">An error occured: Invalid URL</div>;
            }
            return <div className="error-message">An error occured: {error.message}</div>;
          }
          return (
            <div>
              {blogposts[0].coverimage
                ? <CoverImage src={APIURL + blogposts[0].coverimage.formats.medium.url} title={blogposts[0].title} />
                : <CoverImage title={blogposts[0].title} />}
              <div className="contentWrapper">
                <div className="article-date-and-tags">
                  <p className="article-date">{formatDate(blogposts[0].published_at)}</p>
                  <div className="card-tag-container-tagpage">
                    {blogposts[0].tags.map(elem => (
                      <Link className="card-tag-link" to={"/tag/" + elem.Tag} key={elem.Tag}><div className="card-tag" >{elem.Tag}</div></Link>
                    ))}
                  </div>
                </div>
                <div className="markdown-text">
                  <MarkdownView
                    markdown={blogposts[0].content}
                    options={{ emoji: true, noHeaderId: true, strikethrough: true }}
                  />
                </div>
              </div>
              <p className="card-readmore">
                <Link to="/blog">Read all blog posts <i className="fa fa-arrow-right"></i></Link>
              </p>
            </div>
          )
        }
        }
      </Query>
    </>
  );
}

export default Blog;