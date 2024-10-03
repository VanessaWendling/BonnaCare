import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { Photo } from "../Photo";
import { calculateAge, IAge } from "../../Utils/functions";

export interface ICardDogs {
  uuid: string;
  photo: string;
  name: string;
  birthday: string;
  breed: string;
}

export const CardDogs = ({ uuid, photo, name, birthday, breed }: ICardDogs) => {
  const navigate = useNavigate();

  const age: IAge = calculateAge(birthday);

  return (
    <div className="bg-slate-50 shadow-lg min-h-[300px] max-w-[400px] min-w-[250px] rounded-2xl flex flex-col items-center gap-2 p-2 cursor-pointer">
      <div className="bg-yellow-200 rounded-2xl justify-center flex items-center h-40 w-full">
        {photo ? (
          <Photo photo={photo} />
        ) : (
          <MdOutlineAddPhotoAlternate size={64} />
        )}
      </div>
      <h1 className="font-semibold">{name}</h1>
      <h3>
        {age.years}y {age.months}months
      </h3>
      <h3>{breed}</h3>
      <div className="flex-row flex w-full justify-around ">
        <Button
          background={true}
          text="Details"
          idDog={1}
          onClick={() => navigate("/details")}
        />
      </div>
    </div>
  );
};
