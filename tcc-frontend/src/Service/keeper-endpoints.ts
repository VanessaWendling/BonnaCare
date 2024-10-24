import Cookies from "js-cookie";
import { IKeeper } from "../Types/Types";
import { api } from "./axios";

export const createNewAccount = async (data: IKeeper) => {
  const url = `/person`;
  return (await api.post(url, data)).status;
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
