import { PiDogLight } from "react-icons/pi";
import React from "react";
import { Button } from "../Button";
import { calculateAge, IAge } from "../../Utils/functions";
import { Photo } from "../Photo";

interface ICardDigsDetails {
  name: string;
  photo: string;
  birthday: string;
  idDog: string;
  localizator?: string;
}

export const CardDogsDetails = ({
  name,
  photo,
  birthday,
  idDog,
  localizator,
}: ICardDigsDetails) => {
  const age: IAge = calculateAge(birthday);
  return (
    <div className="bg-slate-50 shadow-lg min-h-[200px] rounded-2xl flex flex-row justify-center p-2 gap-4">
      <div className="bg-yellow-200 rounded-2xl self-center justify-center flex items-center h-40 w-40">
        {photo ? <Photo photo={photo} /> : <PiDogLight size={80} />}
      </div>
      <div className="flex flex-col w-32 self-center">
        <h3 className="text-center">{name}</h3>
        <h3 className="text-center">
          {" "}
          {age.years}y {age.months}months
        </h3>
        <h3 className="text-center">{localizator}</h3>
        <div className="flex-row flex w-full justify-around pt-4">
          <Button text="Edit" idDog={idDog} />
        </div>
      </div>
    </div>
  );
};
