import Cookies from "js-cookie";
import { api } from "./axios";

interface IDog {
  name: string;
  photo?: string,
  breed: string;
  microchip: string;
  birthday: string;
  localizator: string;
  keepers: string[];
}

export const createDog = async (data: IDog) => {
  const url = `/dogs`;
  const token = Cookies.get('token')
  console.log(data)
  return api.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
