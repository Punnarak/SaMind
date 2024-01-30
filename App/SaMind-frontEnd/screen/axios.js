import axios from "axios";
const HTTP = axios.create({
  baseURL: "http://10.226.167.102:4343",
    // baseURL: "https://fba5-49-229-135-125.ngrok-free.app/",
});
export default HTTP;

