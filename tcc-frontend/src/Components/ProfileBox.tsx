import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IAddress } from "../Types/Types";
import { Photo } from "./Photo";

export interface IProfile {
  name?: string;
  photo?: string;
  email?: string;
  phone?: string;
  address?: IAddress;
  profileType?: string;
}

export const Profile = ({
  name,
  photo,
  email,
  phone,
  address,
  profileType,
}: IProfile) => {
  return (
    <div className="bg-slate-50 shadow-lg min-h-[450px] max-w-[250px] rounded-2xl my-4 flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-bold ">{name}</h2>
      <div className="bg-yellow-200 rounded-full justify-center flex items-center h-40 w-40">
       {photo? <Photo photo={photo} />: <MdOutlineAddPhotoAlternate size={64} />}
      </div>
      <h3 className="text-base font-normal">{email}</h3>
      <h3 className="text-base font-normal">{phone}</h3>
      <h3 className="text-base font-normal">{address?.city} - {address?.locale}</h3>
      <h3 className="text-base font-bold bg-green-600 text-white p-1 rounded-sm">
        {profileType}
      </h3>
      <h3 className="text-sm font-normal underline cursor-pointer">Change my information</h3>
    </div>
  );
};
