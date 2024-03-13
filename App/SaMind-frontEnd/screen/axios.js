// import axios from "axios";
// const HTTP = axios.create({
//   // baseURL: "http://192.168.1.37:4343",
//   // baseURL: "https://6ef0-49-229-130-189.ngrok-free.app",
//   baseURL: "http://10.226.164.199:4343",
// });
// export default HTTP;

import axios from "axios";
const HTTP = axios.create({
  // baseURL: "http://192.168.1.37:4343",
  // baseURL: "https://6ef0-49-229-130-189.ngrok-free.app",
  baseURL: "http://192.168.1.101:4343",
});

const HTTPpython = axios.create({
  // baseURL: "http://192.168.1.37:4343",
  // baseURL: "https://6ef0-49-229-130-189.ngrok-free.app",
  baseURL: "http://192.168.1.101:5000",
});
export  {HTTP as axios, HTTPpython as axiospython};