import './index.css';
import { useLocation, Route, Switch } from 'react-router-dom';
import { Home, About, Contact, Blog, BlogAll, Projects, ProjectsAll, TagPage, Page404, Photos, PhotosAll } from '../Pages';
import React, { useEffect } from 'react';

function Content() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="app-content-wrapper">
      <div className="content">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/blog" exact component={BlogAll} />
          <Route path="/blog/:slug" component={Blog} />
          <Route path="/projects" exact component={ProjectsAll} />
          <Route path="/projects/:slug" component={Projects} />
          <Route path="/photos" exact component={PhotosAll} />
          <Route path="/photos/:slug" component={Photos} />
          <Route path="/tag/:tag" exact component={TagPage} />
          <Route path="/page404" exact component={Page404} />
          <Route component={Page404} />
        </Switch>
      </div>
    </div>
  );
}

export default Content;
