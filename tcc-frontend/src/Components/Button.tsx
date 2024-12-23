import { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface IButton extends HTMLAttributes<HTMLElement>{
  text: string;
  idPet?: number|string;
  background?: boolean;
}

export const Button = ({ text, idPet, background, ...props }: IButton) => {
  return (
    <div
      className={
        background
          ? "bg-pink-900 text-gray-100 text-center rounded-md px-5 py-2 cursor-pointer hover:bg-pink-800"
          : "border border-black text-center rounded-md px-5 py-2 cursor-pointer"
      }
      {...props}
    >
      <h2>{text}</h2>
    </div>
  );
};
