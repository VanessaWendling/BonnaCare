import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../Components/Button";
import { CardAddConsult } from "../Components/Cards/CardAddConsult";
import { CardConsult } from "../Components/Cards/CardConsult";
import { ICardPets } from "../Components/Cards/CardPets";
import { CardPetsDetails } from "../Components/Cards/CardPetsDetails";
import { CardFind } from "../Components/Cards/CardFind";
import { Header } from "../Components/Header";
import { getConsultsByUuid } from "../Service/consult-endpoints";
import { locPetContinuos } from "../Service/loc-endpoints";
import {
  CustomJwtPayload,
  IConsult,
  IPosition
} from "../Types/Types";

export const DetailsPet = () => {
  const [petPositions, setPetPositions] = useState<IPosition[]>([]);
  const [openModalAddConsult, setOpenModalAddConsult] =
    useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  // const mock: IConsult[] = mockConsult;
  const token = Cookies.get("token");
  const decoded = jwtDecode<CustomJwtPayload>(token!);
  const location = useLocation();
  
  const data: ICardPets = location.state;
  const [listOfConsults, setListOfConsults] = useState<IConsult[]>([]);

  useEffect(() => {
    loadPetLocalization();
    getAllConsults();
  }, [refresh]);

  function getAllConsults() {
    getConsultsByUuid(data.uuid).then((res) =>{
      console.log(res.data)
      setListOfConsults(res.data.consults)});
  }

  function loadPetLocalization() {
    if (decoded.scope == "ROLE_USER" && (data.petLocalization?.localizator != undefined && data.petLocalization?.latitudeRef != undefined))
      locPetContinuos(data.petLocalization?.localizator)
        .then((res) => {
          setPetPositions(res.data);
        })
        .catch(() => {
          console.log("falha");
        });
  }

  function addConsult() {
    setOpenModalAddConsult(true);
  }

  return (
    <>
      <div className="bg-purple-100 h-screen w-screen self-center overflow-x-hidden">
        <Header />
        <div className="grid grid-cols-10 min-h-screen">
          <div className="col-span-1" />
          <div className="items-center col-span-4 flex-row p-4 ">
            <CardPetsDetails
              name={data.name}
              photo={data.photo}
              birthday={data.birthday}
              idPet={data.uuid}
              microchip={data.microchip}
              localizator={data.petLocalization?.localizator}
              role={decoded.scope}
            />
            {decoded.scope == "ROLE_VETERINARIAN" && (
              <div className="p-8">
                <Button
                  text="Add Medical Consultation"
                  background
                  onClick={addConsult}
                />
              </div>
            )}
            {decoded.scope == "ROLE_USER" && (
              <>
                <h3 className="text-lg p-4 font-semibold">Find My Pet</h3>
                <CardFind
                  position={petPositions}
                  positionRef={data.petLocalization}
                />
              </>
            )}
          </div>
          <div className="flex col-span-4 flex-col">
            <h3 className="text-lg p-4 font-semibold">Consults</h3>
            <div className="gap-4">
              {listOfConsults.length > 0 &&
                listOfConsults.map((consult, index) => (
                  <CardConsult consult={consult} key={index} />
                ))}
            </div>
          </div>
          <div className="col-span-1" />
        </div>
      </div>
      {openModalAddConsult && (
        <CardAddConsult
          key={1}
          open={openModalAddConsult}
          setOpen={setOpenModalAddConsult}
          refresh={refresh}
          setRefresh={setRefresh}
          petUuid={data.uuid}
          vet={data.vet!}
          vetUuid={data.vetUuid!}
          listOfClinicsVet={data.listOfClinics!}
        />
      )}
    </>
  );
};
