import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Button } from "../Button";
import { useLocation, useNavigate } from "react-router-dom";
import { Photo } from "../Photo";
import { calculateAge, IAge } from "../../Utils/functions";
import { CustomJwtPayload, IClinic, IPositionRef } from "../../Types/Types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export interface ICardPets {
  uuid: string;
  photo: string;
  name: string;
  birthday: string;
  breed: string;
  vet?: string;
  vetUuid?: string;
  microchip?: string;
  listOfClinics?: IClinic[];
  petLocalization?: IPositionRef;
}

export const CardPets = ({
  uuid,
  photo,
  name,
  birthday,
  microchip,
  breed,
  vet,
  petLocalization,
  listOfClinics,
  vetUuid,
}: ICardPets) => {
  const navigate = useNavigate();
  const token = Cookies.get("token");
  const decoded = jwtDecode<CustomJwtPayload>(token!);
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
      <h1 className="font-semibold text-2xl">{name}</h1>
      <div className="flex flex-row gap-1">
        {age.years > 0 && <h3>{age.years}y</h3>}
        <h3>{age.months}months</h3>
      </div>
      <h3>{breed}</h3>
      <div className="flex flex-row gap-1">
        <h3 className="font-semibold">Microchip:</h3>
        <h3>{microchip}</h3>
      </div>
      {petLocalization?.localizator && decoded.scope == "ROLE_USER" && (
        <div className="flex flex-row gap-1">
          <h3 className="font-semibold">Localizator:</h3>
          <h3>{petLocalization?.localizator}</h3>
        </div>
      )}

      <div className="flex-row flex w-full justify-around mt-auto">
        <Button
          background={true}
          text="Details"
          idPet={1}
          onClick={() =>
            navigate("/details", {
              state: {
                uuid,
                photo,
                name,
                microchip,
                vet,
                birthday,
                breed,
                listOfClinics,
                petLocalization,
                vetUuid,
              },
            })
          }
        />
      </div>
    </div>
  );
};
