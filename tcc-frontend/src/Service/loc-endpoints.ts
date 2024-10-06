import Cookies from "js-cookie";
import { api } from "./axios";

export const locPetContinuos = async (localizator: string) => {
  const url = `/localization/${localizator}`;
  const token = Cookies.get("token");
  return await api.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
