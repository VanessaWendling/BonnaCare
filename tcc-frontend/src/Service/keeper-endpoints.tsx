import Cookies from "js-cookie";
import { IKeepper, ILogin } from "../Types/Types";
import { api } from "./axios";

export const createNewAccount = async (data: IKeepper) => {
  const url = `/person`;
  return (await api.post(url, data)).status;
};

export const login = async (data: ILogin) => {
  const url = `/login`;
  return await api.post(url, data);
};

export const personDetails = async (id: string) => {
  const url = `/person/${id}`;
  const token = Cookies.get('token')
  return await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
