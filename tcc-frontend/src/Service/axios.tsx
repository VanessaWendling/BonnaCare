import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:8080'
})

export const apiViaCep = axios.create({
    baseURL: "https://viacep.com.br/ws"
})