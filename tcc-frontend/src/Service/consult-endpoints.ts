import Cookies from "js-cookie";
import { IConsultCreate } from "../Types/Types";
import { api } from "./axios";

export const createNewConsult = async (data: IConsultCreate) => {
    const url = `/consult`
    const token = Cookies.get('token')
    console.log(data)
    return await api.post(url, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getConsultsByUuid = async (uuid: string) => {
    const url = `/dogs/medicalhistory/${uuid}`
    const token = Cookies.get('token')
    return await api.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}