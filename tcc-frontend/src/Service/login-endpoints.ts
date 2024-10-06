import { ILogin } from "../Types/Types";
import { api } from "./axios";

export const login = async (data: ILogin) => {
    const url = `/login`;
    return await api.post(url, data);
  };