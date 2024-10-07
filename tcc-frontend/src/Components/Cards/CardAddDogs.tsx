import { Dispatch, FormEvent, useState } from "react";
import { breedTypes, IBreedType } from "../../Types/Types";
import { AiOutlineClose, AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { FileUpload } from "../FileUpload";
import { CardNotification } from "./CardNotification";
import { FaExclamationTriangle } from "react-icons/fa";
import { createDog } from "../../Service/dog-endpoints";
import Cookies from "js-cookie";
import { convertData } from "../../Utils/functions";

interface IAddDogs {
  buttonAddPet: boolean;
  setButtonAddPet: Dispatch<boolean>;
  refresh: boolean;
  setRefresh: Dispatch<boolean>;
}

export const CardAddDogs = ({
  buttonAddPet,
  setButtonAddPet,
  refresh,
  setRefresh,
}: IAddDogs) => {
  const [name, setName] = useState<string>("");
  const [microchip, setMicrochip] = useState<string>("");
  const [localizator, setLocalizator] = useState<string>("");
  const [base64Image, setBase64Image] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [listOfBreeds, setListOfBreeds] =
    useState<Array<IBreedType>>(breedTypes);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [changePage, setChangePage] = useState<number>(1);
  const [cardAttention, setCardAttention] = useState<boolean>(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const uuidUser = Cookies.get("uuidUser");
    createDog({
      name: name,
      photo: base64Image,
      breed: selectedBreed,
      microchip: microchip,
      birthday: convertData(birthday!, "getReformattedData"),
      localizator: localizator,
      keepers: [uuidUser!],
    })
      .then(() => {
        setCardAttention(true);
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
        <div className="w-[400px] h-[500px] bg-amber-200 p-6 flex flex-col rounded-md relative items-center">
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
              Add your <span className="text-pink-900">pet</span>
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
                  <label className="font-bold">Name</label>
                  <input
                    className="p-2 rounded-2xl"
                    type="text"
                    placeholder="Buddy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-bold">Breed</label>
                  <select
                    value={selectedBreed}
                    className="rounded-2xl p-2"
                    onChange={(e) => setSelectedBreed(e.target.value)}
                  >
                    {listOfBreeds.map((item: IBreedType) => (
                      <option value={item.breed}>{item.breed}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <label className="font-bold mb-2">Birthday</label>
                  <input
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
                  <label>Microchip</label>
                  <input
                    className="p-2 rounded-2xl"
                    type="text"
                    placeholder="Microchip"
                    value={microchip}
                    onChange={(e) => setMicrochip(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Localizator Code</label>
                  <input
                    className="p-2 rounded-2xl"
                    type="text"
                    placeholder="Loc ID"
                    value={localizator}
                    onChange={(e) => setLocalizator(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label>Photo</label>
                  <FileUpload
                    base64Image={base64Image}
                    setBase64Image={setBase64Image}
                  />
                </div>
                <button
                  type="submit"
                  className="border border-black rounded-xl px-5 py-1 max-w-32"
                >
                  Add dog
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      {cardAttention ? (
        <CardNotification
          text="Lembre-se de setar o local de sua residência no rastreador de seu cachorro."
          state={cardAttention}
          setState={setCardAttention}
          Icon={FaExclamationTriangle}
        />
      ) : (
        ""
      )}
    </>
  );
};
