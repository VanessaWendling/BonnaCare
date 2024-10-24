import { PiDogLight } from "react-icons/pi";
import React from "react";
import { Button } from "../Button";
import { calculateAge, IAge } from "../../Utils/functions";
import { Photo } from "../Photo";

interface ICardDigsDetails {
  name?: string;
  photo?: string;
  birthday?: string;
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
  const age: IAge | undefined = birthday ? calculateAge(birthday) : undefined;
  return (
    <div className="bg-slate-50 shadow-lg min-h-[200px] rounded-2xl flex flex-row justify-evenly p-2 gap-4">
      <div className="bg-pink-900 rounded-2xl self-center justify-center flex items-center h-40 w-40">
        {photo ? <Photo photo={photo} /> : <PiDogLight size={80} />}
      </div>
      <div className="flex flex-col self-center">
        <h3 className="font-semibold text-xl text-center pb-3">{name}</h3>

        <div className="flex flex-row gap-1">
          <h3 className="font-semibold">Idade:</h3>
          {age && age.years > 0 && (
            <h3>
              {age.years}ano{age.years === 1 ? "" : "s"}
            </h3>
          )}
          {age && (
            <h3>
              {age.months}m{age.months === 1 ? "ê" : "e"}s
              {age.months === 1 ? "" : "es"}
            </h3>
          )}
        </div>

        {microchip && (
          <div className="flex flex-row gap-1">
            <h3 className="font-semibold">Microchip:</h3>
            <h3>{microchip}</h3>
          </div>
        )}
        {localizator && role === "ROLE_USER" && (
          <div className="flex flex-row gap-1">
            <h3 className="font-semibold">Localizador:</h3>
            <h3>{localizator}</h3>
          </div>
        )}
        <div className="flex-row flex w-full justify-around pt-4">
          {role === "ROLE_USER" && <Button text="Editar" idPet={idPet} />}
        </div>
      </div>
    </div>
  );
};
