import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaHandHoldingMedical, FaHospitalAlt } from "react-icons/fa";
import { FaRegSquarePlus, FaUserDoctor } from "react-icons/fa6";
import { TbVaccine } from "react-icons/tb";
import { CardAddDogs } from "../Components/Cards/CardAddDogs";
import { CardDogs, ICardDogs } from "../Components/Cards/CardDogs";
import { Header } from "../Components/Header";
import { IProfile, Profile } from "../Components/ProfileBox";
import { Service } from "../Components/Service";
import { personDetails } from "../Service/keeper-endpoints";

export const Home = () => {
  const [buttonAddPet, setButtonAddPet] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<IProfile>();
  const [listOfDogs, setListOfDogs] = useState<ICardDogs[]>();
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
        setListOfDogs(res.data.dogs);
      })
      .catch((e) => {});
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
              profileType={profile?.profileType}
            />
          </div>
          <div className="flex col-span-7 flex-col">
            <div className="flex flex-row items-center">
              <h2 className="text-lg p-4 font-semibold">My Pets</h2>
              <FaRegSquarePlus
                onClick={() => setButtonAddPet(true)}
                size={20}
                className="text-pink-900 cursor-pointer"
              />
            </div>
            <div className="flex flex-row flex-wrap gap-4">
              {listOfDogs?.map((dog, index) => (
                <CardDogs
                  key={index}
                  name={dog.name}
                  uuid={dog.uuid}
                  photo={dog.photo}
                  microchip={dog.microchip}
                  birthday={dog.birthday}
                  breed={dog.breed}
                  petLocalization={dog.petLocalization}
                />
              ))}
            </div>
            <h2 className="text-lg p-4 font-semibold">Search Service </h2>
            <div className="flex gap-2 flex-wrap">
              <Service
                Icon={FaUserDoctor}
                name="Veterinários"
                description="Encontre profissionais especialistas perto de você."
              />
              <Service
                Icon={FaHospitalAlt}
                name="Clinicas"
                description="Encontre clinicas perto de você."
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
