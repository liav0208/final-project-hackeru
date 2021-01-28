import axios from "axios";
import { toast } from "react-toastify";
import { getJwt } from "./userService";

axios.defaults.headers.common["x-auth-token"] = getJwt();

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) toast.error("An unexpected error occurred");
  return Promise.reject(error);
});

const http = {
  post: axios.post,
  get: axios.get,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};

export default http;
