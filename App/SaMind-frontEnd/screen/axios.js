import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://192.168.1.37:4343",
  // baseURL: "https://71ce-49-229-135-252.ngrok-free.app",
});
export default HTTP;

// wifi
