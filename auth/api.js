import axios from "axios";
import { auth } from "./firebaseApp";

const instance = axios.create({
  baseURL: "/api",
});
instance.interceptors.request.use(function (response) {
  console.log("data", auth.currentUser);
  return response;
});
export default instance;
