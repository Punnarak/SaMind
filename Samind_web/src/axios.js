import axios from "axios";
const HTTP = axios.create({
  // baseURL: "https://dfc4-2001-fb1-15-30ce-cc3a-8c0d-162c-cc5b.ngrok-free.app",
  baseURL: "http://192.168.1.38:4301",
});
export default HTTP;
