import React from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

interface IProfile {
  name: String;
  email: String;
  phone: String;
  address: String;
  profileType: String;
}

export const Profile = ({
  name,
  email,
  phone,
  address,
  profileType,
}: IProfile) => {
  return (
    <div className="bg-slate-50 shadow-lg min-h-[450px] max-w-[250px] rounded-2xl my-4 flex flex-col items-center gap-4 p-4">
      <h2 className="text-lg font-bold ">{name}</h2>
      <div className="bg-yellow-200 rounded-full justify-center flex items-center h-40 w-40">
        <MdOutlineAddPhotoAlternate size={64} />
      </div>
      <h3 className="text-base font-normal">{email}</h3>
      <h3 className="text-base font-normal">{phone}</h3>
      <h3 className="text-base font-normal">{address}</h3>
      <h3 className="text-base font-bold bg-green-600 text-white p-1 rounded-sm">
        {profileType}
      </h3>
      <h3 className="text-sm font-normal underline">Alterar meus dados</h3>
    </div>
  );
};
