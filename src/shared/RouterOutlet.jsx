import React from 'react';
import { Route } from 'react-router-dom';

const RouterOutlet = (route) => {

  const render = (props) => {
    // eslint-disable-next-line react/prop-types
    props.history.listen(() => {
      if (document && document.top !== false) {
        window.scrollTo(0, 0);
      }
    });

    const component = (
      <route.component
        {...props}
        routes={route.routes}
        config={route}
      />
    );

    // if (route.protected && (props.staticContext !== undefined && !props.staticContext.login)) {
    //   return <Redirect to={{ pathname: '/' }} />;
    // }

    return component;
  };

  const routeProps = {
    path: route.path,
    render,
  };

  return <Route {...routeProps} />
}

export default RouterOutlet;