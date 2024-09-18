import React from "react";
import { IconType } from "react-icons";

interface IService {
    Icon: IconType;
    name: string;
    description: string; 
}

export const Service = ({Icon, name, description}: IService) => {


  return (
    <div className="bg-slate-50 shadow-lg max-h-[200px] max-w-[200px] rounded-2xl flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-bold ">{name}</h2>
        <Icon size={40} />
      <h3 className="text-sm font-normal">{description}</h3>
    </div>
  );
};
