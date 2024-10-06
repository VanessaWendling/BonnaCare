import { apiViaCep } from "./axios";

export const getCepDetail = async ( number: string) => {
  const url = `/${number}/json/`;
  return (await apiViaCep.get(url)).data;
};
