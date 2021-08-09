import CoverImage from '../CoverImage/index';
import { Link, useParams } from "react-router-dom";
import Card from '../Components/Card/index';
import Query from "../Components/Query/QueryContent"
import gql from "graphql-tag";
import { getFormattedDate, getFormattedLink } from '../Util/CommonUtils';

const TagPage = () => {

  let { tag } = useParams();
  const BLOGPOST_PROJECTPOST_TAG_QUERY = gql`
    query BlogProjectTag($queryTag: String!) {
      projectposts(sort: "published_at:desc", where: { tags: { Tag: $queryTag } }) {
        id
        title
        published_at
        slug
        summary
        tags {
          Tag
        }
      }
      blogposts(sort: "published_at:desc", where: { tags: { Tag: $queryTag } }) {
        id
        title
        published_at
        slug
        summary
        tags {
          Tag
        }
      }
      tags {
        Tag
      }
    }  
  `;

  return (
    <>
      <Query query={BLOGPOST_PROJECTPOST_TAG_QUERY} tag={tag}>
        {({ data, error }) => {
          if (error) {
            if (error.message !== "Cannot read property 'content' of undefined") {
              return <div className="error-message">An error occured: {error.message}</div>;
            }
          }
          return (
            <>
              <CoverImage title={"Tag: " + tag} desc={` | Projects: ${data.projectposts ? data.projectposts.length : 0} | Blog: ${data.blogposts ? data.blogposts.length : 0}`} />
              <div className="medium-col">
                <h2 className="blog-postlist-title">Recent Projects</h2>
                {data.projectposts
                  ? <div className="card-container content-text">
                    {data.projectposts.map(posts => (
                      <Link to={getFormattedLink("/projects/", posts.slug)} key={posts.id}>
                        <Card
                          img={posts.CoverImage ? posts.CoverImage.formats.medium.url : ""}
                          title={posts.title}
                          date={getFormattedDate(posts.published_at)}
                          description={posts.summary}
                          tag1={posts.tags[0] ? posts.tags[0].Tag : false}
                          tag2={posts.tags[1] ? posts.tags[1].Tag : false}
                          tag3={posts.tags[2] ? posts.tags[2].Tag : false}
                        />
                      </Link>
                    ))}
                  </div>
                  : <p className="error-message">No projects found</p>
                }
                <p className="card-readmore">
                  <Link to="/Projects">Explore all projects <i className="fa fa-arrow-right"></i></Link>
                </p>
              </div>
              <div className="medium-col content-text">
                <h2 className="blog-postlist-title">Recent Blog Posts</h2>
                {data.blogposts
                  ? <div className="card-container">
                    {data.blogposts.map(posts => (
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
                    ))}
                  </div>
                  : <p className="error-message">No blog posts found</p>
                }
                <p className="card-readmore">
                  <Link to="/blog">Read all blog posts <i className="fa fa-arrow-right"></i></Link>
                </p>
              </div>
              <div className="medium-col content-text">
                <h2 className="blog-postlist-title">All Tags</h2>
                <div className="card-tag-container-tagpage">
                  {data.tags
                    ? data.tags.map(elem => (
                      <Link to={"/tag/" + elem.Tag} key={elem.Tag} className="card-tag-link">{elem.Tag}</Link>
                    ))
                    : <p className="error-message">No tags found</p>
                  }
                </div>
              </div>
            </>
          )
        }}
      </Query>
    </>
  );
}

export default TagPage;