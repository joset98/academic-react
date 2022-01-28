/* eslint-disable no-undef */
// config.js
import subdomain from './subdomain';

const runtimeConfig = (domain) => (
    typeof window !== 'undefined'
      ? {
          // client
          theme: window.env.theme,
        }
      : {
          // server
          theme: subdomain[domain].theme,
        }
  )

export default runtimeConfig;