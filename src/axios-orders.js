import axios from "axios";

const instance = axios.create({
  baseURL: "https://mj-burgers.firebaseio.com/"
});

export default instance;
