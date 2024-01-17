import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://192.168.56.1:4343",
    // baseURL: "https://fba5-49-229-135-125.ngrok-free.app/",
});
export default HTTP;
