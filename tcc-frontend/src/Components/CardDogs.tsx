import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Button } from "./Button";

export interface ICardDogs {
  id: number;
  name: string;
  age: number;
  breed: string;
}

export const CardDogs = ({ id, name, age, breed }: ICardDogs) => {
  return (
    <div className="bg-slate-50 shadow-lg min-h-[300px] max-w-[400px] rounded-2xl flex flex-col items-center gap-2 p-2">
      <div className="bg-yellow-200 rounded-2xl justify-center flex items-center h-40 w-full">
        <MdOutlineAddPhotoAlternate size={64} />
      </div>
      <h1>{name}</h1>
      <h3>{age}y · {breed}</h3>
      <div className="flex-row flex w-full justify-around ">
        <Button background={false} text="Medical Details" id={1} />
        <Button background={true} text="See Footprints" id={1} />
      </div>
    </div>
  );
};
