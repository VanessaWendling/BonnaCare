import { api } from "./axios";

interface IDog {
  name: string;
  breed: string;
  microchip: string;
  age: string;
  keepers: string[];
}

export const createDog = async (data: IDog) => {
  const url = `/dogs`;
  return api.post(url, data);
};
