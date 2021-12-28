import axios from "axios";

export const api = axios.create({
   baseURL: 'http://capitulo2-dtmoney.netlify.app/api'
})