import React, { HTMLAttributes, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  Icon: IconType;
  className?: string
}

export const Input = ({ Icon, className, ...props }: IInput) => {
  return (
    <label className="flex flex-row min-w-[250px] bg-neutral-200 gap-2 items-center p-2 rounded-md ">
      <Icon size={24} className="text-slate-600" />
      <input
        // {...register("password", { required: true })}
        className="bg-transparent border-none outline-none"
        {...props}
      />
    </label>
  );
};
