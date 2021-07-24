import { useParams } from "react-router";
import MarkdownView from 'react-showdown';
import { Link } from "react-router-dom";
import CoverImage from '../CoverImage/index';
import Query from "../Components/Query/QueryContent";
import gql from "graphql-tag";

const Projects = () => {
  let { slug } = useParams();
  const APIURL = process.env.REACT_APP_BACKEND_URL;
  const PROJECTPOST_CONTENT_QUERY = gql`
    query ProjectPost($slug: String!){
      projectposts( where: {slug: $slug }) {
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
      <Query query={PROJECTPOST_CONTENT_QUERY} slug={slug}>
        {({ data: { projectposts }, error }) => {
          if (error) {
            if (error.message === "Cannot read property 'content' of undefined") {
              return <div className="error-message">An error occured: Invalid URL</div>;
            }
            return <div className="error-message">An error occured: {error.message}</div>;
          }
          return (
            <div>
              {projectposts[0].coverimage
                ? <CoverImage src={APIURL + projectposts[0].coverimage.formats.medium.url} title={projectposts[0].title} />
                : <CoverImage title={projectposts[0].title} />}
              <div className="contentWrapper">
                <div className="article-date-and-tags">
                  <p className="article-date">{formatDate(projectposts[0].published_at)}</p>
                  <div className="card-tag-container-tagpage">
                    {projectposts[0].tags.map(elem => (
                      <Link className="card-tag-link" to={"/tag/" + elem.Tag} key={elem.Tag}><div className="card-tag" >{elem.Tag}</div></Link>
                    ))}
                  </div>
                </div>
                <div className="markdown-text">
                  <MarkdownView
                    markdown={projectposts[0].content}
                    options={{ emoji: true, noHeaderId: true, strikethrough: true }}
                  />
                </div>
              </div>
              <p className="card-readmore">
                <Link to="/projects">Explore all projects <i className="fa fa-arrow-right"></i></Link>
              </p>
            </div>
          )
        }
        }
      </Query>
    </>
  );
}

export default Projects;