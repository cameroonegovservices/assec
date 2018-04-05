import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { withRouter, Switch, Route } from 'react-router';

// application
import { routes } from './routes';
import { debug } from './lib/debug';
import { keypath } from './lib/keypath';
import { pagetitle } from './lib/pagetitle';
import MainNavigation from './components/navs/MainNavigation';

const PageComponent = ({ location }) => {
  const bodyclass = `route-page-${location.pathname
    .split('/')
    .filter(v => v)
    .join('-') || 'home'}`;
  return (
    <div id="app-container" className="flex-columns">
      <Helmet>
        <body className={`${bodyclass}`} />
        <title>
          {pagetitle(routes, location.pathname)}
          {debug() ? ' | DEV' : ''} | Assec Backoffice
        </title>
        {/* <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto" /> */}
        <link rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700" />
      </Helmet>
      <MainNavigation path={location.pathname} routes={routes} />
      <div id="page-container" className="flex1">
        {/* routes */}
        <Switch>
          {routes.map(({
            path, exact, name, icon, component: Component,
          }) => {
            const key = keypath(path, 'route');
            return (
              <Route key={key}
                path={path}
                render={() => <Component name={name} icon={icon} />}
                exact={exact || false} />
            );
          })}
        </Switch>
        {/* routes */}
      </div>
    </div>
  );
};

PageComponent.propTypes = {
  location: PropTypes.object.isRequired,
};

export default withRouter(PageComponent);
