import { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { SnackbarDispatchContext } from "providers/Snackbar/provider";
import { SNACKBAR_SHOW } from "providers/Snackbar/actions";

const useFetch = ({ loading: initialLoading, uri, ...config }) => {
  const [loading, setLoading] = useState(initialLoading);
  const dispatch = useContext(SnackbarDispatchContext);

  const fetch = async (data = {}, configAux = {}) => {
    setLoading(true);
    try {
      const response = await axios({
        ...config,
        ...(config.method !== "get" ? { data } : { params: data }),
        url: uri,
        ...configAux,
      });

      setTimeout(() => {
        setLoading(false);
      }, 100);
      return response;
    } catch (error) {
      setTimeout(() => {
        dispatch({
          type: SNACKBAR_SHOW,
          payload: {
            message:
              error.response.data.detalle ||
              "Error comunicación con el servidor",
            severity: "error",
          },
        });
        setLoading(false);
      }, 100);
      return error.response;
    }
  };

  const fetchLogin = async (data = {}) => {
    setLoading(true);

    try {
      const response = await axios({
        ...config,
        data: `grant_type=password&username=${encodeURIComponent(
          data.username
        )}&password=${encodeURIComponent(data.password)}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        url: uri,
      });
      setTimeout(() => {
        setLoading(false);
      }, 100);
      return response;
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 100);
      return error.response;
    }
  };

  return {
    loading,
    fetch,
    fetchLogin,
  };
};

useFetch.propTypes = {
  uri: PropTypes.string,
  loading: PropTypes.bool,
  method: PropTypes.string,
};

useFetch.defaultProps = {
  uri: "/",
  loading: false,
  method: "get",
};

export default useFetch;
