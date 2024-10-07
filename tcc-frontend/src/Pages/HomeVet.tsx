import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { CardAddDogs } from "../Components/Cards/CardAddDogs";
import { CardClinic, ICardClinic } from "../Components/Cards/CardClinic";
import { Header } from "../Components/Header";
import { Input } from "../Components/Input";
import { IProfile, Profile } from "../Components/ProfileBox";
import { vetDetails } from "../Service/vet-endpoints";
import { Button } from "../Components/Button";
import { findPetByMicrochipID } from "../Service/dog-endpoints";
import { CardDogs, ICardDogs } from "../Components/Cards/CardDogs";

export const HomeVet = () => {
  const [buttonAddPet, setButtonAddPet] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile>();
  const [listOfClinics, setListOfClinics] = useState<ICardClinic[]>();
  const [refresh, setRefresh] = useState<boolean>(false);
  const [microchip, setMicrochip] = useState<string>("");
  const [pet, setPet] = useState<ICardDogs>();
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
          uuid: res.data.uuid
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
      <div className="bg-amber-50 h-screen w-screen self-center overflow-x-hidden">
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
              <h2 className="text-lg py-4 ps-4 font-semibold">Find Pet:</h2>
              <Input
                Icon={GoSearch}
                placeholder="Microchip ID"
                onChange={(e) => setMicrochip(e.target.value)}
              />
              <Button text="Search" background onClick={findPetByMicrochip} />
            </div>
            <div className="flex flex-row flex-wrap gap-4 min-h-[250px]">
              {pet && (
                <CardDogs
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
                <h2 className="text-center self-center text-red-600 text-2xl font-semibold">
                  {petError}
                </h2>
              )}
            </div>
            <h2 className="text-lg p-4 font-semibold">Linked Clinics</h2>
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
        <CardAddDogs
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
