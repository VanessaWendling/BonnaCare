import Cookies from "js-cookie";
import { api } from "./axios";

interface IPet {
  name: string;
  photo?: string,
  breed: string;
  microchip: string;
  birthday: string;
  localizator: string;
  keepers: string[];
}

export const createPet = async (data: IPet) => {
  const url = `/pets`;
  const token = Cookies.get('token')
  console.log(data)
  return api.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const findPetByMicrochipID = async (microchip: string) => {
  const url = `/pets/microchip/${microchip}`
  const token = Cookies.get('token')
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
