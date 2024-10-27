import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../Components/Button";
import { CardAddConsult } from "../Components/Cards/CardAddConsult";
import { CardConsult } from "../Components/Cards/CardConsult";
import { CardFind } from "../Components/Cards/CardFind";
import { ICardPets } from "../Components/Cards/CardPets";
import { CardPetsDetails } from "../Components/Cards/CardPetsDetails";
import { Header } from "../Components/Header";
import { getConsultsByUuid } from "../Service/consult-endpoints";
import { locPetContinuos } from "../Service/loc-endpoints";
import { CustomJwtPayload, IConsult, IPosition } from "../Types/Types";
import { MdOutlinePinDrop } from "react-icons/md";
import { Input } from "../Components/Input";
import { AiTwotoneExclamationCircle } from "react-icons/ai";

import {
  getPetDataByUUID,
  IPetRes,
  putPetLocalizator,
} from "../Service/pet-endpoints";
import { CardKeeper } from "../Components/Cards/CardKeeper";

export const DetailsPet = () => {
  const [petPositions, setPetPositions] = useState<IPosition[]>([]);
  const [openModalAddConsult, setOpenModalAddConsult] =
    useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [pet, setPet] = useState<IPetRes>();
  const token = Cookies.get("token");
  const decoded = jwtDecode<CustomJwtPayload>(token!);
  const location = useLocation();

  const data: ICardPets = location.state;
  const [listOfConsults, setListOfConsults] = useState<IConsult[]>([]);
  const [localizator, setLocalizator] = useState<string>("");

  useEffect(() => {
    loadPetLocalization();
    getAllConsults();
    getPetData();
  }, [refresh]);

  function getPetData() {
    getPetDataByUUID(data.uuid).then((res) => {
      setPet(res.data);
    });
  }

  function getAllConsults() {
    getConsultsByUuid(data.uuid).then((res) => {
      setListOfConsults(res.data.consults);
    });
  }

  function putLocalizator() {
    if (localizator !== "") {
      const uuid = data.uuid;
      putPetLocalizator({ uuid, localizator }).then(() => {
        setRefresh(!refresh);
        setLocalizator("");
      });
    }
  }

  function loadPetLocalization() {
    if (
      decoded.scope === "ROLE_USER" &&
      data.petLocalization?.localizator !== undefined &&
      data.petLocalization?.latitudeRef !== undefined
    )
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
              name={pet?.name}
              photo={pet?.photo}
              birthday={pet?.birthday}
              idPet={data.uuid}
              microchip={pet?.microchip}
              localizator={pet?.petLocalizator?.localizator}
              role={decoded.scope}
            />
            {decoded.scope === "ROLE_VETERINARIAN" && (
              <>
                <h3 className="text-lg p-4 font-semibold">
                  Tutor{pet && pet?.keepers.length > 1 ? "es" : ""}
                </h3>
                {pet?.keepers.map((keeper) => (
                  <CardKeeper keeper={keeper} />
                ))}
              </>
            )}
            {decoded.scope === "ROLE_VETERINARIAN" && (
              <div className="py-2 px-8">
                <Button
                  text="Nova Consulta Médica"
                  background
                  onClick={addConsult}
                />
              </div>
            )}
            {decoded.scope === "ROLE_USER" &&
              (pet?.petLocalizator?.localizator === "" ||
                pet?.petLocalizator?.localizator == null) && (
                <div className="bg-slate-50 shadow-lg rounded-2xl flex flex-col justify-center p-4 gap-4 my-4">
                  <h3 className="text-lg font-semibold text-center">
                    Cadastre o localizador do seu Pet aqui:
                  </h3>
                  <div className="flex flex-row justify-center gap-2">
                    <div className="shadow-lg">
                      <Input
                        Icon={MdOutlinePinDrop}
                        placeholder={"loc"}
                        type="text"
                        value={localizator}
                        onChange={(e) => setLocalizator(e.target.value)}
                      />
                    </div>
                    <Button text="Enviar" background onClick={putLocalizator} />
                  </div>
                </div>
              )}
            {decoded.scope === "ROLE_USER" && (
              <>
                <div className="flex flex-row p-4 items-center gap-2">
                  <h3 className="text-lg font-semibold">Localizar Meu Pet</h3>
                  <AiTwotoneExclamationCircle />
                </div>
                <CardFind
                  position={petPositions}
                  positionRef={pet?.petLocalizator}
                />
                <div className="flex flex-row ps-4 pt-1 items-center gap-2">
                  <AiTwotoneExclamationCircle size={30}/>
                  <h3 className="text-xs text-center">
                    Este mapa marca os pontos onde seu pet está fora de casa.
                    Se não houver referências exibidas, isso indica que não
                    houve nenhuma intercorrência.
                  </h3>
                </div>
              </>
            )}
          </div>
          <div className="flex col-span-4 flex-col">
            <h3 className="text-lg p-4 font-semibold">Consultas</h3>
            <div className="gap-4">
              {listOfConsults.length > 0 ? (
                listOfConsults.map((consult, index) => (
                  <CardConsult consult={consult} key={index} />
                ))
              ) : (
                <div className="bg-slate-50 shadow-lg rounded-2xl flex flex-col justify-center p-4 gap-4 mb-4">
                  <h3 className="text-center font-semibold">
                    Ainda não há consultas para exibir
                  </h3>
                </div>
              )}
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
