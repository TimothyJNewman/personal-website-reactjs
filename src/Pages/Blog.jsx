import { useParams } from "react-router";
import MarkdownView from 'react-showdown';
import { Link } from "react-router-dom";
import CoverImage from '../CoverImage/index';
import Query from "../Components/Query/QueryContent";
import gql from "graphql-tag";
import { getFormattedDate } from "../Util/CommonUtils";

const Blog = () => {
  let { slug } = useParams();
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

  return (
    <>
      <Query query={BLOGPOST_CONTENT_QUERY} slug={slug}>
        {({ data, error }) => {
          if (error) {
            if (error.message === "Cannot read property 'content' of undefined") {
              return <div className="error-message">An error occured: Invalid URL</div>;
            }
            return <div className="error-message">An error occured: {error.message}</div>;
          }
          return (
            <div className="medium-col">
              {data.blogposts[0].coverimage
                ? <CoverImage src={data.blogposts[0].coverimage.formats.medium.url} title={data.blogposts[0].title} />
                : <CoverImage title={data.blogposts[0].title} />}
              <div className="content-wrapper content-text">
                <div className="article-date-and-tags">
                  <p className="article-date">{getFormattedDate(data.blogposts[0].published_at)}</p>
                  <div className="card-tag-container-tagpage">
                    {data.blogposts[0].tags.map(elem => (
                      <Link className="card-tag-link" to={"/tag/" + elem.Tag} key={elem.Tag}>{elem.Tag}</Link>
                    ))}
                  </div>
                </div>
                <div className="markdown-text">
                  <MarkdownView
                    markdown={data.blogposts[0].content}
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