import axios from "axios";

const instance = axios.create({
  baseURL: "https://6496bb7d83d4c69925a30dda.mockapi.io/tweeter-accounts",
});

export default instance;
