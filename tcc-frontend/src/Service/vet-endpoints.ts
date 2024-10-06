import Cookies from "js-cookie"
import { api } from "./axios"

export const vetDetails = async (id: string) => {
    const url = `/vet/${id}`
    const token = Cookies.get('token')
    return await api.get(url, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}