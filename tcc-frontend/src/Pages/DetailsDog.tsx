import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CardConsult } from "../Components/Cards/CardConsult";
import { ICardDogs } from "../Components/Cards/CardDogs";
import { CardDogsDetails } from "../Components/Cards/CardDogsDetails";
import { CardFind } from "../Components/Cards/CardFind";
import { Header } from "../Components/Header";
import { locPetContinuos } from "../Service/loc-endpoints";
import { IConsult, IPosition, mockConsult } from "../Types/Types";

export const DetailsDog = () => {
  const [petPositions, setPetPositions] = useState<IPosition[]>([]);
  const mock: IConsult[] = mockConsult;

  const location = useLocation();

  const data: ICardDogs = location.state;

  useEffect(() => {
    loadPetLocalization();
  }, []);

  function loadPetLocalization() {
    if (data.petLocalization?.localizator)
      locPetContinuos(data.petLocalization?.localizator)
        .then((res) => {
          setPetPositions(res.data);
        })
        .catch(() => {
          console.log("falha");
        });
  }

  return (
    <div className="bg-amber-50 h-screen w-screen self-center overflow-x-hidden">
      <Header />
      <div className="grid grid-cols-10 min-h-screen">
        <div className="col-span-1" />
        <div className="items-center col-span-4 flex-row p-4 ">
          <CardDogsDetails
            name={data.name}
            photo={data.photo}
            birthday={data.birthday}
            idDog={data.uuid}
            microchip={data.microchip}
            localizator={data.petLocalization?.localizator}
          />
          <h3 className="text-lg p-4 font-semibold">Find My Pet</h3>
          <CardFind
            position={petPositions}
            positionRef={data.petLocalization}
          />
        </div>
        <div className="flex col-span-4 flex-col">
          <h3 className="text-lg p-4 font-semibold">Consults</h3>
          <div className="gap-4">
            {mock.map((m, index) => (
              <CardConsult consult={m} key={index} />
            ))}
          </div>
        </div>
        <div className="col-span-1" />
      </div>
    </div>
  );
};
