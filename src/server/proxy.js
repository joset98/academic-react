import btoa from "btoa";
import { createProxyMiddleware } from "http-proxy-middleware";
import subdomain from './subdomain';

//localhost:3000/api -> "http://localhost:8080/
export default createProxyMiddleware({
  target: process.env.RAZZLE_API_URL,
  pathRewrite: { "^/api": "" },
  onProxyReq: (proxyReq, req) => {
    if (proxyReq.path.includes("/oauth/token")) {
      proxyReq.setHeader(
        "Authorization",
        `Basic ${btoa(
          `${process.env.RAZZLE_TOKEN_AUTH_USERNAME}:${process.env.RAZZLE_TOKEN_AUTH_PASSWORD}`
        )}`,
        proxyReq.setHeader('X-tenant', subdomain[req.get('host')]['X-tenant'])
      );
    }

    const auth = JSON.parse(req.cookies.auth ? req.cookies.auth : "{}");

    if (auth.access_token) {
      proxyReq.setHeader("Authorization", `Bearer ${auth.access_token}`);
      proxyReq.setHeader('X-tenant', subdomain[req.get('host')]['X-tenant'])
    }
  },
});
