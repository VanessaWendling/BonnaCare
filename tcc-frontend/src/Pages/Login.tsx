import { FormEvent, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoginImage from "../assets/loginImage_copy.jpg";
import { CardNotification } from "../Components/Cards/CardNotification";
import { CardRegister } from "../Components/Cards/CardRegister";
import { Input } from "../Components/Input";
import { login, personDetails } from "../Service/keeper-endpoints";
import Cookies from 'js-cookie'


export const Login = () => {
  const [joinUs, setJoinUs] = useState<boolean>(false);
  const [registerSuccess, setRegisterSuccess] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); //
    if (username !== "" && password !== "") {
      login({ username, password })
        .then((res) => {
          console.log(res.data)
          Cookies.set('token', res.data.token, {expires: 1})
          Cookies.set('uuidUser', res.data.uuid, {expires: 1} )
          navigate("/home");  // Navega para a rota '/home'
        })
        .catch((e) => {
          console.error("Erro no login", e);
          setError("Try it again.");
        });
    }
  }


  return (
    <>
      <div className="bg-amber-900 flex min-h-screen justify-center items-center">
        <div className=" max-w-[1000px] max-h-[500px] md:h-[600px] bg-stone-100 flex flex-col-reverse md:flex-row m-auto rounded-md justify-between  my-8">
          <div className="w-full md:w-1/2 flex flex-col justify-center align-baseline items-center p-4">
            <div className="w-full text-gray-900 text-center">
              <h1 className="px-4 text-2xl md:text-4xl font-bold pt-4">
                Welcome to
              </h1>
              <h1 className="px-4 text-4xl md:text-6xl font-bold">
                Bonna<span className="text-rose-800">Care</span>
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 p-6 items-center w-full"
            >
              <Input
                Icon={MdAlternateEmail}
                placeholder={"email"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                Icon={MdPassword}
                placeholder={"********"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <h2>{error}</h2>
              <button
                type="submit"
                className="border border-black rounded-md px-5 py-1 max-w-32"
              >
                Sign in
              </button>
            </form>
            <h2
              onClick={() => setJoinUs(true)}
              className="text-center text-brown-900 cursor-pointer"
            >
              Join us
            </h2>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center  ">
            <img
              className="object-cover h-full rounded-e-md"
              src={LoginImage}
            />
          </div>
        </div>
      </div>
      {joinUs ? (
        <CardRegister
          joinUs={joinUs}
          setJoinUs={setJoinUs}
          setRegisterSuccess={setRegisterSuccess}
        />
      ) : (
        ""
      )}
      {registerSuccess ? (
        <CardNotification
          text="Perfil cadastrado com sucesso!"
          setState={setRegisterSuccess}
          state={registerSuccess}
          Icon={FaCheckCircle}
        />
      ) : (
        ""
      )}
    </>
  );
};
