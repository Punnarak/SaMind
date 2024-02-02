import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://10.226.165.98:4301",
});
export default HTTP;
