import Cookies from "js-cookie";
import { Dispatch, FormEvent, useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { createPet } from "../../Service/pet-endpoints";
import { breedTypes, IBreedType } from "../../Types/Types";
import { convertData } from "../../Utils/functions";
import { FileUpload } from "../FileUpload";
import { Input } from "../Input";

interface IAddPets {
  buttonAddPet: boolean;
  setButtonAddPet: Dispatch<boolean>;
  refresh: boolean;
  setRefresh: Dispatch<boolean>;
}

export const CardAddPets = ({
  buttonAddPet,
  setButtonAddPet,
  refresh,
  setRefresh,
}: IAddPets) => {
  const [name, setName] = useState<string>("");
  const [microchip, setMicrochip] = useState<string>("");
  const [localizator, setLocalizator] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [listOfBreeds, setListOfBreeds] =
    useState<Array<IBreedType>>(breedTypes);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [changePage, setChangePage] = useState<number>(1);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const uuidUser = Cookies.get("uuidUser");
    createPet({
      name: name,
      photo: base64Image,
      breed: selectedBreed,
      microchip: microchip,
      birthday: convertData(birthday!, "getReformattedData"),
      petLocalizator: { localizator: localizator },
      keepers: [uuidUser!],
    })
      .then(() => {
        setButtonAddPet(!buttonAddPet);
        setRefresh(!refresh);
      })
      .catch();
  }

  return (
    <>
      <div
        className={
          buttonAddPet
            ? "fixed inset-0 flex justify-center items-center  z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <div className="w-[400px] h-[500px] bg-purple-300 p-6 flex flex-col rounded-md relative items-center">
          <div className="flex flex-row justify-between w-full">
            <AiOutlineClose
              size={28}
              className="cursor-pointer"
              onClick={() => setButtonAddPet(false)}
            />
            {changePage === 1 ? (
              <AiOutlineRight
                className="cursor-pointer"
                onClick={() => setChangePage(changePage + 1)}
                size={28}
              />
            ) : (
              <AiOutlineLeft
                className="cursor-pointer"
                onClick={() => setChangePage(changePage - 1)}
                size={28}
              />
            )}
          </div>
          {changePage === 1 ? (
            <h1 className="px-4 text-3xl sm:text-3xl md:text-5xl lg:6xl font-bold pt-4">
              Meu <span className="text-pink-900">Pet</span>
            </h1>
          ) : (
            ""
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 p-4 items-center m-4"
          >
            {changePage === 1 ? (
              <>
                <div className="flex flex-col">
                  <label className="font-bold">Nome</label>
                  <Input
                    className="p-2 rounded-2xl"
                    type="text"
                    placeholder="Buddy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-bold">Raça</label>
                  <select
                    value={selectedBreed}
                    className="rounded-lg p-2"
                    // size={5}
                    onChange={(e) => setSelectedBreed(e.target.value)}
                  >
                    {listOfBreeds.map((item: IBreedType) => (
                      <option value={item.breed}>
                        {item.breed.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-bold mb-2">Data de Aniversário</label>
                  <Input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="border border-gray-300 rounded-2xl p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Microchip</label>
                  <Input
                    className="p-2 rounded-2xl"
                    type="text"
                    placeholder="Microchip"
                    value={microchip}
                    onChange={(e) => setMicrochip(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold mb-2">
                    Código do Localizador
                  </label>
                  <Input
                    className="p-2 rounded-2xl"
                    type="text"
                    placeholder="Loc ID"
                    value={localizator}
                    onChange={(e) => setLocalizator(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-bold mb-2">Foto</label>
                  <FileUpload
                    base64Image={base64Image}
                    setBase64Image={setBase64Image}
                  />
                </div>
                <button
                  type="submit"
                  className="border border-black rounded-xl px-5 py-1 max-w-32"
                >
                  Add Pet
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
};
