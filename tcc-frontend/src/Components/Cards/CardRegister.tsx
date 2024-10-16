import { SubmitHandler, useForm } from "react-hook-form";
import React, { Dispatch, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { FileUpload } from "../FileUpload";
import { getCepDetail } from "../../Service/apiViaCep-endpoints";
import { createNewAccount } from "../../Service/keeper-endpoints";
import { IAddress } from "../../Types/Types";

interface ICardRegister {
  joinUs: boolean;
  setJoinUs: Dispatch<boolean>;
  setRegisterSuccess: Dispatch<boolean>;
}

export const CardRegister = ({ joinUs, setJoinUs, setRegisterSuccess }: ICardRegister) => {
  const [changePage, setChangePage] = useState<number>(1);
  const [photo, setPhoto] = useState<string>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [cep, setCep] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [locale, setLocale] = useState<string>("");
  const [neighborhood, setNeighborhood] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [error, setError] = useState<string>();
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [crvm, setCrvm] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validatePassword()) {
      const address: IAddress = {
        city: city,
        locale: locale,
        neighborhood: neighborhood,
        number: number,
        postalCode: cep,
        street: street,
      };
      const status = await createNewAccount({
        name,
        photo,
        email,
        password,
        phone,
        address,
      });
      console.log(status);
      if (status == 201) {
        setJoinUs(false);
        setRegisterSuccess(true)
      }
    }
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (password != undefined && !passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter, and a number."
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleCepBlur = async () => {
    if (cep != undefined)
      getCepDetail(cep).then((res) => {
        setLocale(res.uf);
        setCity(res.localidade);
        setNeighborhood(res.bairro);
        setStreet(res.logradouro);
      });
  };
  return (
    <>
      <div
        className={
          joinUs
            ? "fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <div className="max-w-[800px] md:w-[800px] bg-purple-300 p-6 flex flex-col m-auto rounded-md relative items-center">
          <div className="flex flex-row justify-between w-full">
            <AiOutlineClose
              size={28}
              className="cursor-pointer"
              onClick={() => setJoinUs(false)}
            />
            <div className="flex flex-row">
              {changePage > 1 ? (
                <AiOutlineLeft
                  className="cursor-pointer"
                  onClick={() => setChangePage(changePage - 1)}
                  size={28}
                />
              ) : (
                ""
              )}
              {changePage < 3 ? (
                <AiOutlineRight
                  className="cursor-pointer"
                  onClick={() => setChangePage(changePage + 1)}
                  size={28}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <>
            {changePage === 1 ? (
              <h1 className="px-4 text-3xl sm:text-3xl md:text-5xl lg:6xl font-bold w-[500px] flex-wrap text-center pt-4">
                We're glad to have <span className="text-pink-900">you</span>{" "}
                here
              </h1>
            ) : (
              ""
            )}
            {changePage === 2 ? (
              <h1 className="px-4 text-3xl sm:text-3xl md:text-5xl lg:6xl font-bold pt-4">
                Address information
              </h1>
            ) : (
              ""
            )}
            {changePage === 3 ? (
              <h1 className="px-4 text-3xl sm:text-3xl md:text-5xl lg:6xl font-bold flex-wrap text-center w-[500px] pt-4">
                Set
                <span className="text-pink-900"> your</span> password
              </h1>
            ) : (
              ""
            )}
          </>
          <form
            className="flex flex-col gap-4 p-4 items-center m-4"
            onSubmit={handleSubmit}
          >
            {changePage === 1 ? (
              <>
                <div className="flex flex-row gap-8 items-center">
                  <div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Name</label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="Full Name"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">E-mail</label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 rounded-2xl"
                        type="email"
                        placeholder="user@mail.com"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Phone</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="(xx) x xxxx-xxxx"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-semibold">Photo</label>
                    <FileUpload
                      base64Image={photo}
                      setBase64Image={setPhoto}
                    />
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {changePage === 2 ? (
              <>
                <div className="flex flex-row gap-8">
                  <div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">CEP</label>
                      <input
                        value={cep}
                        onChange={(e) => setCep(e.target.value)}
                        onBlur={handleCepBlur}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="xxxxx-xxx"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">City</label>
                      <input
                        value={city}
                        disabled={city != ""}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="Rio de Janeiro"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Locale</label>
                      <input
                        value={locale}
                        disabled={locale != ""}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="RJ"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Street</label>
                      <input
                        value={street}
                        disabled={street != ""}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="Mosela"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Neighborhood</label>
                      <input
                        value={neighborhood}
                        disabled={neighborhood != ""}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="Mosela"
                      />
                    </div>
                    <div className="flex flex-col pb-2">
                      <label className="font-semibold">Number</label>
                      <input
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        className="p-2 rounded-2xl"
                        type="text"
                        placeholder="A202"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {changePage === 3 ? (
              <>
                <div className="flex flex-col">
                  <label className="font-semibold">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 rounded-2xl"
                    type="password"
                    placeholder="********"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Confirm your password</label>
                  <input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 rounded-2xl"
                    type="password"
                    placeholder="********"
                  />
                </div>
                <h3 className="w-[500px] text-center flex-wrap text-red-700">
                  {error}
                </h3>
                <button
                  type="submit"
                  className="border border-black rounded-xl px-5 py-1 max-w-32"
                >
                  Sign up
                </button>
              </>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </>
  );
};
