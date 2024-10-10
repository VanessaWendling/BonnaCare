import { PiDogLight } from "react-icons/pi";
import React from "react";
import { Button } from "../Button";
import { calculateAge, IAge } from "../../Utils/functions";
import { Photo } from "../Photo";

interface ICardDigsDetails {
  name: string;
  photo: string;
  birthday: string;
  idPet: string;
  localizator?: string;
  microchip?: string;
  role: string;
}

export const CardPetsDetails = ({
  name,
  photo,
  birthday,
  idPet,
  localizator,
  microchip,
  role,
}: ICardDigsDetails) => {
  const age: IAge = calculateAge(birthday);
  return (
    <div className="bg-slate-50 shadow-lg min-h-[200px] rounded-2xl flex flex-row justify-evenly p-2 gap-4">
      <div className="bg-yellow-200 rounded-2xl self-center justify-center flex items-center h-40 w-40">
        {photo ? <Photo photo={photo} /> : <PiDogLight size={80} />}
      </div>
      <div className="flex flex-col self-center">
        <h3 className="font-semibold text-xl text-center pb-3">{name}</h3>
        <h3 className="text-center">
          {age.years}y {age.months}months
        </h3>
        {microchip && (
          <div className="flex flex-row gap-1">
            <h3 className="font-semibold">Microchip:</h3>
            <h3>{microchip}</h3>
          </div>
        )}
        {localizator && role == "ROLE_USER" && (
          <div className="flex flex-row gap-1">
          <h3 className="font-semibold">Localizator:</h3>
          <h3>{localizator}</h3>
        </div>
        )}
        <div className="flex-row flex w-full justify-around pt-4">
          {role == "ROLE_USER" && <Button text="Edit" idPet={idPet} />}
        </div>
      </div>
    </div>
  );
};
