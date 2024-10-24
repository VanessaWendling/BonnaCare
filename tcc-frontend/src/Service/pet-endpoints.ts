import Cookies from "js-cookie";
import { api } from "./axios";
import { IKeeper, IPositionRef } from "../Types/Types";

export interface IPetNew {
  name: string;
  photo?: string,
  breed: string;
  microchip: string;
  birthday: string;
  petLocalizator?: IPositionRef;
  keepers: string[];
}
export interface IPetRes {
  name: string;
  photo?: string,
  breed: string;
  microchip: string;
  birthday: string;
  petLocalizator?: IPositionRef;
  keepers: IKeeper[];
}

interface PetLocalizator{
  uuid: string;
  localizator:string;
}

export const createPet = async (data: IPetNew) => {
  const url = `/pets`;
  const token = Cookies.get('token')
  console.log(data)
  return api.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const getPetDataByUUID = async (uuid: string) => {
  const url = `/pets/${uuid}`
  const token = Cookies.get('token')
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const findPetByMicrochipID = async (microchip: string) => {
  const url = `/pets/microchip/${microchip}`
  const token = Cookies.get('token')
  return api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const putPetLocalizator = async(data: PetLocalizator) => {
  const url = `/pets/localizator`;
  const token = Cookies.get('token')

  return api.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}