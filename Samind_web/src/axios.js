import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://10.226.165.79:4343",
});
export default HTTP;