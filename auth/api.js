import axios from "axios";
import { auth } from "./firebaseApp";

const instance = axios.create({
  baseURL: "/api",
});
instance.interceptors.request.use(function (response) {
  return response;
});
export default instance;
