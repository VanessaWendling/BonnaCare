import { IAddress } from "../../Types/Types";
import { BsHospital } from "react-icons/bs";
import { formatPhoneNumber } from "../../Utils/functions";

export interface ICardClinic {
  uuid: string;
  name: string;
  phone: string;
  address: IAddress;
}

export const CardClinic = ({ uuid, name, phone, address }: ICardClinic) => {
  return (
    <div className="bg-slate-50 shadow-lg max-h-[250px] max-w-[300px] w-full rounded-2xl flex flex-col items-center gap-4 p-4 cursor-pointer">
      <h2 className="text-lg font-bold">{name}</h2>
      <div className="flex flex-row gap-4">
        <div className="flex justify-center content-center">
          <BsHospital className="self-center " size={40} />
        </div>
        <div>
          <div className="flex flex-row gap-1">
            <h2 className="text-sm font-semibold text-center">Phone:</h2>
            <h2 className="text-sm font-normal text-center">{formatPhoneNumber(phone)}</h2>
          </div>
          <h2 className="text-sm font-semibold">Address:</h2>
          <h3 className="text-sm font-normal text-center text-wrap ps-2">
            {address.street}, {address.neighborhood} - {address.number}
          </h3>
          <h3 className="text-sm font-normal text-center">
            {address.city} - {address.locale}
          </h3>
          <h3 className="text-sm font-normal text-center">
            {address.postalCode}
          </h3>
        </div>
      </div>
    </div>
  );
};
