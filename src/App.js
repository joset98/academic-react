import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RouterOutlet from "layouts/RouterOutlet";
import Providers from "providers";
import {routes} from "routing";

const App = () => (
  <Providers>
    <Routes>
    {routes.map((route) => (
        <Route path={route.path} element={<route.component/>} key={route.path} {...route} />
      ))}

      {/* {routes.map((route) => (
        <RouterOutlet key={route.path} {...route} />
      ))} */}
    </Routes>
  </Providers>
);

export default App;
