import { SubmitHandler, useForm } from "react-hook-form";
import LoginImage from "../assets/loginImage.jpg";
import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="bg-pink-600  flex h-full justify-center items-center ">
      <div className="max-w-[800px] md:w-[800px] bg-brown-200 flex flex-col m-auto rounded-md relative my-8">
        <div className="absolute w-full h-full text-gray-200 max-h-[400px] sm:w-[240px] bg-black/40 flex flex-col">
          <h1 className="px-4 text-2xl sm:text-2xl md:text-4xl lg:7xl font-bold pt-4">
            Welcome to
          </h1>
          <h1 className="px-4 text-4xl sm:text-5xl md:text-6xl lg:8xl font-bold">
            Bonna<span className="text-pink-900">Care</span>
          </h1>
        </div>
        <img
          className="max-h-[400px] md:w-[800px] sm:w-[240px] w-full object-cover rounded-t-xl"
          src={LoginImage}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 items-center m-4"
        >
          <div className="flex flex-col">
            <label>E-mail</label>
            <input
              {...register("email")}
              className="p-2 rounded-2xl"
              type="email"
              placeholder="user@mail.com"
            />
          </div>
          <div className="flex flex-col">
            <label>Password</label>
            <input
              {...register("password", { required: true })}
              className="p-2 rounded-2xl"
              type="password"
              placeholder="********"
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <button
            type="submit"
            className="border border-black rounded-xl px-5 py-1 max-w-32"
          >
            Sign in
          </button>
        </form>
        <h2 onClick={() => navigate("/register")} className="text-center pb-6 text-brown-900 cursor-pointer">
          Join us
        </h2>
      </div>
    </div>
  );
};
