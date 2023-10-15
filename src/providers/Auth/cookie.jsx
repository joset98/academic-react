import React, { useContext, useEffect } from 'react';

import { AuthDataContext } from 'providers/Auth/provider';
import { setCookie, getCookie } from 'utils/cookie';

/**
 * HOC que permite almacenar en la Cookie la data
 * referente a la orden del usuario
 */
const AuthCookie = () => (Component) => (props) => {
  const user = useContext(AuthDataContext);

  useEffect(() => {
    if (JSON.stringify(user) !== JSON.stringify(getCookie('user'))) {
      setCookie('user', JSON.stringify({ ...user, isAddingNew: false }), 3600000);
    }
  }, [user]);

  return <Component {...props} />;
};

export default AuthCookie;
