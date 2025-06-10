import axios from "axios";

//Variable de DB
const baseURL = "http://127.0.0.1:8080/";

export const axi = axios.create({
    baseURL,
})