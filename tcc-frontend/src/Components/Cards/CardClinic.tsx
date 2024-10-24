import { IAddress } from "../../Types/Types";
import { BsHospital } from "react-icons/bs";
import { formatPhoneNumber } from "../../Utils/functions";
import { MdOutlinePhoneInTalk } from "react-icons/md";

export interface ICardClinic {
  uuid: string;
  name: string;
  phone: string;
  address: IAddress;
}

export const CardClinic = ({ uuid, name, phone, address }: ICardClinic) => {
  return (
    <div className="bg-slate-50 shadow-lg max-h-[250px] max-w-[300px] w-full rounded-2xl flex flex-col items-center p-4 cursor-pointer">
      <h2 className="text-lg font-bold">{name}</h2>
      <div className="flex flex-row gap-1 items-center">
        <MdOutlinePhoneInTalk />
        <h2 className="text-sm font-normal text-center">
          {formatPhoneNumber(phone)}
        </h2>
      </div>
      <div className="flex flex-row gap-4 pt-1">
        <div className="flex justify-center content-center">
          <BsHospital className="self-center " size={36} />
        </div>
        <div>
          <h3 className="text-sm font-normal text-center text-wrap ps-2">
            {address.street}, {address.neighborhood} - {address.number}
          </h3>
          <h3 className="text-sm font-normal text-center">
            {address.city}/{address.locale} - {address.postalCode}
          </h3>
        </div>
      </div>
    </div>
  );
};
