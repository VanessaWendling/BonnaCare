import { useEffect, useState } from "react";
import { IConsult } from "../../Types/Types";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";

interface ICardConsult {
  consult: IConsult;
}

export const CardConsult = ({ consult }: ICardConsult) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);

  const color = (() => {
    switch (consult.consultType) {
      case "ROUTINE":
        return "bg-green-500";
      case "EMERGENCY":
        return "bg-red-500";
      case "VACCINE":
        return "bg-blue-500";
      case "SURGERY":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  })();

  return (
    <div className="bg-slate-50 shadow-lg rounded-2xl flex flex-col justify-center p-4 gap-4 mb-4">
      <div className="flex justify-between px-2">
        <h3 className={`${color} font-semibold rounded-md p-1`}>
          {consult.consultType}
        </h3>
        <h3 className="text-center self-end">
          {consult.date.substring(0, 10)}
        </h3>
      </div>
      <div>
        <h2 className="font-semibold">Reason for Consultation:</h2>
        <h2 className="ps-8">{consult.reason}</h2>
      </div>
      <div>
        <h2 className="font-semibold">Clinical Observations:</h2>
        <h2 className="ps-8">{consult.observations}</h2>
      </div>
      <div className="flex flex-row">
        <h2 className="font-semibold">Weight:</h2>
        <h2 className="ps-2">{consult.weight} kg</h2>
      </div>
      <div>
        <h2 className="font-semibold"> Treatment Plan:</h2>
        <h2 className="ps-8">{consult.treatmentPlan}</h2>
      </div>

      <div className="flex flex-row items-center gap-2 px-2">
        <h2>Details</h2>
        {openDetails ? (
          <FaRegSquareMinus
            onClick={() => setOpenDetails(!openDetails)}
            size={20}
            className="text-pink-900 cursor-pointer"
          />
        ) : (
          <FaRegSquarePlus
            onClick={() => setOpenDetails(!openDetails)}
            size={20}
            className="text-pink-900 cursor-pointer"
          />
        )}
      </div>
      {openDetails ? (
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col w-full">
            <h3 className="text-base font-semibold self-center">
              Veterinarian
            </h3>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">Name:</h2>
              <h3>{consult.veterinarian.name}</h3>
            </div>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">CRVM: </h2>
              <h3 className="text-center">{consult.veterinarian.crmv}</h3>
            </div>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">Specialization: </h2>
              <h3 className="text-center">
                {consult.veterinarian.specialization.replace("_", " ")}
              </h3>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-base font-semibold self-center">Clinic</h3>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">Clinic: </h2>
              <h3 className="text-center">{consult.clinic.name}</h3>
            </div>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">Phone: </h2>
              <h3 className="text-center">{consult.clinic.phone}</h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
