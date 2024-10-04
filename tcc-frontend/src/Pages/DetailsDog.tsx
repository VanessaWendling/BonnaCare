import React from "react";
import { Header } from "../Components/Header";
import { CardDogsDetails } from "../Components/Cards/CardDogsDetails";
import { CardConsult } from "../Components/Cards/CardConsult";
import {
  IConsult,
  IPosition,
  mockConsult,
  mockPetsPosition,
} from "../Types/Types";
import { CardFind } from "../Components/Cards/CardFind";
import { useLocation } from "react-router-dom";
import { ICardDogs } from "../Components/Cards/CardDogs";

export const DetailsDog = () => {
  const mock: IConsult[] = mockConsult;
  const mockPositons: IPosition[] = mockPetsPosition;

  const location = useLocation();
  const data: ICardDogs = location.state;
  return (
    <div className="bg-amber-50 h-screen w-screen self-center overflow-x-hidden">
      <Header />
      <div className="grid grid-cols-10 min-h-screen">
        <div className="col-span-1" />
        <div className="items-center col-span-3 flex-row p-4 ">
          <CardDogsDetails name={data.name} photo={data.photo} birthday={data.birthday} idDog={data.uuid} localizator={data.petLocalization?.localizator} />
          <h3 className="text-lg p-4 font-semibold">Find My Pet</h3>
          <CardFind position={mockPositons} positionRef={data.petLocalization} />
        </div>
        <div className="flex col-span-5 flex-col">
          <h3 className="text-lg p-4 font-semibold">Consults</h3>
          <div className="gap-4">
            {mock.map((m: IConsult) => (
              <CardConsult consult={m} />
            ))}
          </div>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
};
