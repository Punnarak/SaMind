import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://10.226.163.107:4301",
});
export default HTTP;
