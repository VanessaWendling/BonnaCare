import { SubmitHandler, useForm } from "react-hook-form";
import LoginImage from "../assets/loginImage_copy.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail, MdPassword } from "react-icons/md";
import { Input } from "../Components/Input";

type Inputs = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = (data) => navigate("/home");

  console.log(watch("email")); // watch input value by passing the name of it

  return (
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
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-6 items-center w-full"
          >
              <Input Icon={MdAlternateEmail} placeholder={"email"}/>
              <Input Icon={MdPassword} placeholder={"********"}/>
              {errors.password && <span>This field is required</span>}
            <button
              type="submit"
              className="border border-black rounded-md px-5 py-1 max-w-32"
            >
              Sign in
            </button>
          </form>
          <h2
            onClick={() => navigate("/register")}
            className="text-center pb-6 text-brown-900 cursor-pointer"
          >
            Join us
          </h2>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center  ">
          <img className="object-cover h-full rounded-e-md" src={LoginImage} />
        </div>
      </div>
    </div>
  );
};
