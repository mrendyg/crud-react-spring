import axios from "axios";

const baseURL = "http://127.0.0.1:8080/";

export const axi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});