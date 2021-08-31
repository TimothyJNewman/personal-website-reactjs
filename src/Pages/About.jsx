import Query from "../Components/Query/QueryContent"
import gql from "graphql-tag";
import MarkdownView from 'react-showdown';
import CoverImage from '../CoverImage/index';

const About = () => {

  const BLOGPOST_PROJECTPOST_TAG_QUERY = gql`
    query {
      aboutpagecontent {
        title
        content
        coverimage {
          formats
        }
      }
    }
  `;

  return (
    <>
      <Query query={BLOGPOST_PROJECTPOST_TAG_QUERY} >
        {({ data, error }) => {
          if (error) {
            return <div className="error-message">An error occured: {error.message}</div>;
          }
          return (
            <>
              <div className="medium-col">
                {data.aboutpagecontent
                ? <>
                    {data.aboutpagecontent.coverimage
                      ? <CoverImage src={data.aboutpagecontent.coverimage.url} title={data.aboutpagecontent.title} />
                      : <CoverImage title={data.aboutpagecontent.title} />}
                    <div className="content-wrapper content-text">
                      <div className="markdown-text">
                        <MarkdownView
                          markdown={data.aboutpagecontent.content}
                          options={{ emoji: true, noHeaderId: true, strikethrough: true }}
                        />
                      </div>
                    </div>
                  </>
                : <p className="error-message">No about page</p>
                }
              </div>
            </>
          );
        }}
      </Query>
    </>
  );
}

export default About;