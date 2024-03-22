// import axios from "axios";
// const HTTP = axios.create({
//   baseURL: "http://192.168.1.38:4301",
//   withCredentials: true,
// });
// export default HTTP;

import axios from "axios";

const HTTP = axios.create({
  baseURL: "http://localhost:4301",
  withCredentials: true, // Send cookies with requests
});

// Configure Axios interceptors to automatically store and send cookies
HTTP.interceptors.request.use((config) => {
  // Modify config to include credentials
  config.withCredentials = true;
  return config;
});

export default HTTP;