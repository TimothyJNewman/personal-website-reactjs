import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CoverImage from '../CoverImage/index';
import Query from "../Components/Query/QueryContent";
import gql from "graphql-tag";

const Photos = () => {
  let { slug } = useParams();
  const PHOTOS_CONTENT_QUERY = gql`
    query PhotoGallery($slug: String!) {
      galleries(where: { slug: $slug }) {
        id
        coverimage {
          formats
        }
        title
        published_at
        images {
          formats
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
      <Query query={PHOTOS_CONTENT_QUERY} slug={slug}>
        {({ data: { galleries }, error }) => {
          if (error) {
            if (error.message === "Cannot read property 'content' of undefined") {
              return <div className="error-message">An error occured: Invalid URL</div>;
            }
            return <div className="error-message">An error occured: {error.message}</div>;
          }
          return (
            <div>
              {galleries[0].coverimage
                ? <CoverImage src={galleries[0].coverimage.formats.medium.url} title={galleries[0].title} />
                : <CoverImage title={galleries[0].title} />}
              <div className="contentWrapper">
                <div className="article-date-and-tags">
                  <p className="article-date">{formatDate(galleries[0].published_at)}</p>
                </div>
              </div>
              <p className="card-readmore">
                <Link to="/photos">See all galleries <i className="fa fa-arrow-right"></i></Link>
              </p>
            </div>
          )
        }
        }
      </Query>
    </>
  );
}

export default Photos;