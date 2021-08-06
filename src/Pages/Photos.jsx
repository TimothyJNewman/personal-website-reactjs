import { useParams } from "react-router";
import { Link } from "react-router-dom";
import CoverImage from '../CoverImage/index';
import Query from "../Components/Query/QueryContent";
import gql from "graphql-tag";
import { getFormattedDate } from "../Util/CommonUtils";

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

  return (
    <>
      <Query query={PHOTOS_CONTENT_QUERY} slug={slug}>
        {({ data, error }) => {
          if (error) {
            if (error.message === "Cannot read property 'content' of undefined") {
              return <div className="error-message">An error occured: Invalid URL</div>;
            }
            return <div className="error-message">An error occured: {error.message}</div>;
          }
          return (
            <div className="medium-col">
              {data.galleries[0].coverimage
                ? <CoverImage src={data.galleries[0].coverimage.formats.medium.url} title={data.galleries[0].title} />
                : <CoverImage title={data.galleries[0].title} />}
              <div className="content-wrapper">
                <div className="article-date-and-tags">
                  <p className="article-date">{getFormattedDate(data.galleries[0].published_at)}</p>
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