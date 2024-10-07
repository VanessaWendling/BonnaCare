import React, { ChangeEventHandler, HTMLAttributes, InputHTMLAttributes } from "react";
import { IconType } from "react-icons";

interface IInput extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>{
  Icon?: IconType;
  className?: string;
  isLarge?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; // Aceitar onChange para ambos os tipos de evento
  [key: string]: any;
}

export const Input = ({
  Icon,
  className,
  isLarge,
  onChange,
  ...props
}: IInput) => {
  return (
    <label
      className={`flex flex-row min-w-[250px] bg-white gap-2 items-center p-2 rounded-md ${className}`}
    >
      {Icon && <Icon size={24} className="text-slate-600" />}
      {isLarge ? (
        <textarea
          className="bg-transparent border-none outline-none resize-none w-full"
          rows={4} // Definindo o tamanho do textarea
          onChange={onChange} // O tipo do evento será inferido corretamente
          {...props}
        />
      ) : (
        <input
          className={`bg-transparent border-none outline-none w-full`}
          onChange={onChange} // O tipo do evento será inferido corretamente
          {...props}
        />
      )}
    </label>
  );
};
