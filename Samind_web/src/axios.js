import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://192.168.56.1:4301",
});
export default HTTP;
