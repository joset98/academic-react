/* eslint-disable import/no-dynamic-require */
import express from "express";
import cookieParser from "cookie-parser";
import markup from "server/markup";
import proxy from "server/proxy";
import render from "server/render";
import authentication, { getUser } from "server/authentication";

const server = express();
server
  .disable("x-powered-by")
  .use(cookieParser())
  .get("/token", getUser)
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use("/api", proxy)
  .get("/*", authentication, markup, render);

export default server;
