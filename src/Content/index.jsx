import './index.css';
import { useLocation, Route, Switch } from 'react-router-dom';
import { Home, About, Contact, Blog, BlogAll, Projects, TagPage, Page404, Photos} from '../Pages';
import React, {useEffect} from 'react';

function Content(){
  const location = useLocation();
  useEffect(() => {           
    window.scrollTo(0, 0);     
    }, [location]);
    return (
        <div className="App-content-wrapper">
          <div className="App-content">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/blog" exact component={BlogAll} />
            <Route path={"blog/:topicId"} component={Blog} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/projects" exact component={Projects} />
            <Route path="/tagpage" exact component={TagPage} />
            <Route path="/photos" exact component={Photos} />
            <Route component={Page404} />
          </Switch>
          </div>
        </div>
    );
}

export default Content;
