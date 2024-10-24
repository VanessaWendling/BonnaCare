import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaHandHoldingMedical, FaHospitalAlt } from "react-icons/fa";
import { FaRegSquarePlus, FaUserDoctor } from "react-icons/fa6";
import { TbVaccine } from "react-icons/tb";
import { CardAddPets } from "../Components/Cards/CardAddPet";
import { CardPets, ICardPets } from "../Components/Cards/CardPets";
import { Header } from "../Components/Header";
import { IProfile, Profile } from "../Components/ProfileBox";
import { Service } from "../Components/Service";
import { personDetails } from "../Service/keeper-endpoints";

export const Home = () => {
  const [buttonAddPet, setButtonAddPet] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile>();
  const [listOfPets, setListOfPets] = useState<ICardPets[]>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    getUserDetails();
  }, [refresh]);

  function getUserDetails() {
    const uuid = Cookies.get("uuidUser");
    personDetails(uuid!)
      .then((res) => {
        setProfile({
          name: res.data.name,
          photo: res.data.photo,
          email: res.data.email,
          phone: res.data.phone,
          address: res.data.address,
          profileType: "TUTOR",
        });
        setListOfPets(res.data.pets);
      })
      .catch((e) => {});
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
              profileType={profile?.profileType}
            />
          </div>
          <div className="flex col-span-7 flex-col">
            <div className="flex flex-row items-center">
              <h2 className="text-lg p-4 font-semibold">Meus Pets</h2>
              <FaRegSquarePlus
                onClick={() => setButtonAddPet(true)}
                size={20}
                className="text-pink-900 cursor-pointer"
              />
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              {listOfPets?.map((pet, index) => (
                <CardPets
                  key={index}
                  name={pet.name}
                  uuid={pet.uuid}
                  photo={pet.photo}
                  microchip={pet.microchip}
                  birthday={pet.birthday}
                  breed={pet.breed}
                  petLocalization={pet.petLocalization}
                />
              ))}
            </div>
            <h2 className="text-lg p-4 font-semibold">Encontrar Serviços</h2>
            <div className="flex gap-2 flex-wrap">
              <Service
                Icon={FaUserDoctor}
                name="Veterinários"
                description="Encontre profissionais especialistas perto de você."
              />
              <Service
                Icon={FaHospitalAlt}
                name="Clínicas"
                description="Encontre clínicas perto de você."
              />
              <Service
                Icon={TbVaccine}
                name="Vacinas"
                description="Veja as vacinas disponíveis."
              />
              <Service
                Icon={FaHandHoldingMedical}
                name="Exames"
                description="Entenda um pouco sobre cada exame."
              />
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
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ) : (
        ""
      )}
    </>
  );
};
