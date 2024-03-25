import axios from "axios";

const HTTP = axios.create({
  // baseURL: "http://192.168.1.37:4343",
  baseURL: "https://65f3-2001-fb1-16-95d2-99df-cf76-dd5f-b4.ngrok-free.app",
  // baseURL: "http://192.168.1.38:4343",
});

const path = HTTP.defaults.baseURL;
const HTTPpython = axios.create({
  // baseURL: "http://192.168.1.37:4343",
  // baseURL: "https://6ef0-49-229-130-189.ngrok-free.app",
  baseURL: "http://192.168.1.38:5000",
});
export { HTTP as axios, HTTPpython as axiospython, path };
