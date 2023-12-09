import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://192.168.56.1:4343",
  // baseURL: "https://ba0c-49-229-132-211.ngrok-free.app",
});
export default HTTP;
