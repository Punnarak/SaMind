import axios from "axios";
const HTTP = axios.create({
  baseURL: "https://cbfb-49-229-129-109.ngrok-free.app",
  // baseURL: "http://10.226.163.85:4301",
  withCredentials: true,
});
export default HTTP;
