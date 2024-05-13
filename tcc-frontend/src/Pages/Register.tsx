import { SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

export const Register = () => {
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
    <div className="bg-pink-600 flex h-full justify-center items-center py-8">
      <div className="max-w-[800px] md:w-[800px] bg-brown-200 flex flex-col m-auto rounded-md relative items-center">
        <h1 className="px-4 text-3xl sm:text-3xl md:text-5xl lg:6xl font-bold pt-4">
          We're glad to have <span className="text-pink-900">you</span> here</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 p-4 items-center m-4"
        >
          <div className="flex flex-col">
            <label>Name</label>
            <input
              {...register("email")}
              className="p-2 rounded-2xl"
              type="text"
              placeholder="Full Name"
            />
          </div>
          <div className="flex flex-col">
            <label>E-mail</label>
            <input
              {...register("password", { required: true })}
              className="p-2 rounded-2xl"
              type="email"
              placeholder="user@mail.com"
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <div className="flex flex-col">
            <label>Age</label>
            <input
              {...register("password", { required: true })}
              className="p-2 rounded-2xl"
              type="number"
              placeholder="Age"
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <button
            type="submit"
            className="border border-black rounded-xl px-5 py-1 max-w-32">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};
