import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { IAddress, translateSpecialization } from "../Types/Types";
import { Photo } from "./Photo";
import { formatPhoneNumber } from "../Utils/functions";

export interface IProfile {
  name?: string;
  photo?: string;
  email?: string;
  phone?: string;
  crmv?: string;
  uuid?: string
  specialization?: string;
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
  crmv,
  specialization,
  uuid
}: IProfile) => {
  return (
    <div className="bg-slate-50 shadow-lg min-h-[450px] max-w-[250px] rounded-2xl my-4 flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-bold ">{name}</h2>
      <div className="bg-pink-900 rounded-2xl justify-center flex items-center h-40 w-40">
        {photo ? (
          <Photo photo={photo} />
        ) : (
          <MdOutlineAddPhotoAlternate size={64} className="text-slate-50"/>
        )}
      </div>
      <h3 className="text-base font-normal">{email}</h3>
      {phone && <h3 className="text-base font-normal">{formatPhoneNumber(phone)}</h3>}
      {address && (
        <h3 className="text-base font-normal">
          {address?.city} - {address?.locale}
        </h3>
      )}
      {specialization && (
        <h3 className="text-base font-normal">
          {translateSpecialization(specialization)}
        </h3>
      )}
      {crmv && <h3 className="text-base font-normal">{crmv}</h3>}

      <h3 className="text-base font-bold bg-green-600 text-white p-1 rounded-sm">
        {profileType}
      </h3>
      <h3 className="text-sm font-normal underline cursor-pointer">
        Alterar meus dados 
      </h3>
    </div>
  );
};
