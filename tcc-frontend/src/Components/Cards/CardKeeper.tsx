import { MdOutlineAlternateEmail, MdOutlinePhoneInTalk } from "react-icons/md";
import { IKeeper } from "../../Types/Types";
import { HiOutlineHome } from "react-icons/hi";

interface ICardKeeper {
  keeper: IKeeper;
}

export const CardKeeper = ({ keeper }: ICardKeeper) => {
  return (
    <div className="bg-slate-50 shadow-lg rounded-2xl flex flex-col justify-center p-4 gap-4 mb-2">
      <h3 className="font-semibold text-center">{keeper.name}</h3>
      <div className="flex flex-row justify-evenly">
        <div className="flex flex-row gap-1 items-center">
          <MdOutlineAlternateEmail />
          <h3>{keeper.email}</h3>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <MdOutlinePhoneInTalk />
          <h3>{keeper.phone}</h3>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <HiOutlineHome size={24} />
        <h3>
          {keeper.address.street}, {keeper.address.number} -{" "}
          {keeper.address.neighborhood}
        </h3>
        <h3>
          {keeper.address.city}/{keeper.address.locale} -{" "}
          {keeper.address.postalCode}
        </h3>
      </div>
    </div>
  );
};
