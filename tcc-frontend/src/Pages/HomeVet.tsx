import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { CardAddPets } from "../Components/Cards/CardAddPet";
import { CardClinic, ICardClinic } from "../Components/Cards/CardClinic";
import { Header } from "../Components/Header";
import { Input } from "../Components/Input";
import { IProfile, Profile } from "../Components/ProfileBox";
import { vetDetails } from "../Service/vet-endpoints";
import { Button } from "../Components/Button";
import { findPetByMicrochipID } from "../Service/pet-endpoints";
import { CardPets, ICardPets } from "../Components/Cards/CardPets";

export const HomeVet = () => {
  const [buttonAddPet, setButtonAddPet] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile>();
  const [listOfClinics, setListOfClinics] = useState<ICardClinic[]>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [microchip, setMicrochip] = useState<string>("");
  const [pet, setPet] = useState<ICardPets>();
  const [petError, setPetError] = useState<string>();

  useEffect(() => {
    getVetDetails();
  }, [refresh]);

  function getVetDetails() {
    const uuid = Cookies.get("uuidUser");
    vetDetails(uuid!)
      .then((res) => {
        setProfile({
          name: res.data.name,
          photo: res.data.photo,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          specialization: res.data.specialization,
          crmv: res.data.crmv,
          profileType: "VET",
          uuid: res.data.uuid,
        });
        setListOfClinics(res.data.clinic);
      })
      .catch((e) => console.log(e));
  }

  function findPetByMicrochip() {
    if (microchip !== "") {
      findPetByMicrochipID(microchip)
        .then((res) => {
          setPet(res.data);
          setPetError("");
        })
        .catch((e) => {
          setPetError(e.response.data.message);
          setPet(undefined);
        });
    }
  }

  return (
    <>
      <div className="bg-purple-100 h-screen w-screen self-center overflow-x-hidden pb-4">
        <Header />
        <div className="min-h-screen flex flex-col sm:grid md:grid-cols-10">
          <div className="md:col-span-1" />
          <div className="items-center col-span-2 flex-row px-4">
            <Profile
              name={profile?.name}
              photo={profile?.photo}
              address={profile?.address}
              email={profile?.email}
              phone={profile?.phone}
              crmv={profile?.crmv}
              specialization={profile?.specialization}
              profileType={profile?.profileType}
            />
          </div>
          <div className="flex col-span-7 flex-col ">
            <div className="flex flex-row items-center gap-2">
              <h2 className="text-lg py-4 ps-4 font-semibold">
                Encontrar Pet:
              </h2>
              <div className="shadow-lg">
                <Input
                  Icon={GoSearch}
                  placeholder="Microchip ID"
                  onChange={(e) => setMicrochip(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      findPetByMicrochip(); // Chama a função apenas quando 'Enter' for pressionado
                    }
                  }}
                />
              </div>
              <Button text="Buscar" background onClick={findPetByMicrochip} />
            </div>
            <div className="flex flex-row flex-wrap gap-4 min-h-[250px]">
              {pet && (
                <CardPets
                  birthday={pet.birthday}
                  breed={pet.breed}
                  name={pet.name}
                  photo={pet.photo}
                  uuid={pet.uuid}
                  key={pet.uuid}
                  microchip={pet.microchip}
                  vet={profile!.name}
                  vetUuid={profile!.uuid}
                  listOfClinics={listOfClinics}
                />
              )}
              {petError && (
                <div className="bg-slate-50 shadow-lg rounded-2xl flex flex-col justify-center p-4 gap-4 mb-4">
                <h3 className="text-center font-semibold text-red-500">
                  {petError}
                </h3>
              </div>
              )}
            </div>
            <h2 className="text-lg p-4 font-semibold">Clínicas Vinculadas</h2>
            <div className="flex gap-2 flex-wrap">
              {listOfClinics?.map((clinic, index) => (
                <CardClinic
                  key={index}
                  name={clinic.name}
                  phone={clinic.phone}
                  address={clinic.address}
                  uuid={clinic.uuid}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {buttonAddPet ? (
        <div className="bg-black/80 fixed w-full h-screen top-0 left-0" />
      ) : (
        ""
      )}
      {/* Menu */}
      {buttonAddPet ? (
        <CardAddPets
          buttonAddPet={buttonAddPet}
          setButtonAddPet={setButtonAddPet}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      ) : (
        ""
      )}
    </>
  );
};
