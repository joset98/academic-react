import jwt from "jsonwebtoken"; 

export default (req, res, next) => {
  const { url } = req;
  const auth = JSON.parse(req.cookies.auth ? req.cookies.auth : "{}");

  if (url.includes("/p") && (!auth || !auth.access_token)) {
    console.log("A")
    return res.redirect("/auth/login");
  }
  if ((url === "/" || url.includes("/auth")) && auth && auth.access_token) {
    console.log("B")
    return res.redirect("/p/estudiantes");
  }
  
  if (url === "/" && (!auth || !auth.access_token)) {
    console.log("C")
    return res.redirect("/auth/login");
  }

  return next();
};

export const getUser = (req, res) => {

  const auth = JSON.parse(req.cookies.auth ? req.cookies.auth : "{}");
  const token = auth ? auth.access_token : null;
  try {
    console.log('token')
    console.log(token)
    const decoded = jwt.verify(token, process.env.RAZZLE_TOKEN_JWT_TOKEN);
    return res.send(decoded);
  } catch(err) {
    // err
    console.log(err)
    return res.status(403).send("Token incorrecto");
  }
}