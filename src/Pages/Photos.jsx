import { useParams, Redirect } from "react-router";
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
            return <div className="error-message">An error occured: {error.message}</div>;
          } else if (data.galleries.length === 0) {
            return <Redirect to="/page404" />
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