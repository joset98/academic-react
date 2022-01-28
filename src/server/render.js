/* eslint-disable import/no-dynamic-require */
import fonts from "styles/fonts";
import Helmet from "react-helmet";
import serialize from 'serialize-javascript'; // Safer stringify, prevents XSS attacks
import runtimeConfig from './config';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

export default (req, res) => {
  const { markup, ico, staticStyles, css } = req;
  const helmet = Helmet.renderStatic();

  res.status(200).send(
    `<!doctype html>
    <html lang="es">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />          
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="icon" href="${ico}" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <style type="text/css">
            ${fonts}
            ${staticStyles}
          </style>
          <style id="jss-server-side">${css}</style>
          ${
            assets.client.css
              ? `<link rel="stylesheet" href="${assets.client.css}">`
              : ""
          }
          ${
            process.env.NODE_ENV === "production"
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }

          <script>
            function load() {
              const spinner = document.getElementById("spinner-loading");	
              padre = spinner.parentNode;
              setTimeout(() => {
                padre.removeChild(spinner);
              }, 300)
            }
            window.onload = load;
          </script>
      </head>
      <body >
          <div class="spinner-loading" id="spinner-loading">
            <div class="lds-ripple"><div></div><div></div></div>
          </div>
          <div id="root">${markup}</div>
          <script>window.env = ${serialize(runtimeConfig(req.get('host')))};</script>
      </body>
    </html>`
  );
};
