import { Dispatch } from "react";
import { GoCheck } from "react-icons/go";

interface ICheck {
  check: boolean;
  setCheck: Dispatch<boolean>;
}

export const Check = ({check, setCheck}: ICheck) => {
  return (
    <div
      onClick={() => setCheck(!check)}
      className="border-2 border-amber-900 w-5 h-5 rounded-md bg-slate-50"
    >
      {check ? <GoCheck size={16} color="text-slate-600" /> : ""}
    </div>
  );
};
