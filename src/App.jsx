// import logo from './logo.svg';
import React from "react";
import { Switch } from "react-router-dom";
import RouterOutlet from "shared/RouterOutlet";
import Providers from "providers";
import routes from "routes";

const App = () => (
  <Providers>
    <Switch>
      {routes.map((route) => (
        <RouterOutlet key={route.path} {...route} />
      ))}
    </Switch>
  </Providers>
);

export default App;
