import Cookies from "js-cookie";
import { api } from "./axios";

export const getListOfVaccines = async () => {
    const url = `/vaccines`;
  const token = Cookies.get('token')
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
 }

 export const getListOfExams = async () => {
    const url = `/exams`;
  const token = Cookies.get('token')
  return await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
 }