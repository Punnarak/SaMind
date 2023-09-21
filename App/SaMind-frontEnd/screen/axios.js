import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://192.168.137.1:4343",
});
export default HTTP;