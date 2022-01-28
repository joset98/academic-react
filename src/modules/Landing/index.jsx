import { AuthDataContext } from "providers/Auth/provider";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect } from "react";

const Landing = () => {
  const auth = useContext(AuthDataContext);
  const history = useHistory();

  useEffect(() => {
    if (auth.token) history.push("/p/estudiantes");
    else history.push("/auth/login");
  }, []);

  return <></>;
};

export default Landing;
