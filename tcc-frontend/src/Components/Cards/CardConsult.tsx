import { useState } from "react";
import { IConsult, translateConsultType, translateSpecialization } from "../../Types/Types";
import { FaRegSquarePlus, FaRegSquareMinus } from "react-icons/fa6";
import { convertData, formatPhoneNumber } from "../../Utils/functions";
import { DownloadPDF } from "../DownloadPDF";

interface ICardConsult {
  consult: IConsult;
}

export const CardConsult = ({ consult }: ICardConsult) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openExams, setOpenExams] = useState<boolean>(false);
  const [openVaccines, setOpenVaccines] = useState<boolean>(false);

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
    <div className="bg-slate-50 shadow-lg rounded-2xl flex flex-col justify-center p-4 gap-1 mb-4">
      <div className="flex justify-between px-2">
        <h3 className={`${color} font-semibold rounded-md p-1`}>
          {consult.consultType && translateConsultType(consult.consultType)}
        </h3>
        {consult.date && (
          <h3 className="text-center self-end">
            {convertData(consult.date.substring(0, 10), "getReformattedData")}
          </h3>
        )}
      </div>
      <div>
        <h2 className="font-semibold">Motivo da Consulta:</h2>
        <h2 className="ps-8">{consult.reason}</h2>
      </div>
      <div>
        <h2 className="font-semibold">Observações Clínicas:</h2>
        <h2 className="ps-8">{consult.observations}</h2>
      </div>
      <div>
        <h2 className="font-semibold">Plano de Tratamento:</h2>
        <h2 className="ps-8">{consult.treatmentPlan}</h2>
      </div>
      <div className="flex flex-row">
        <h2 className="font-semibold">Peso:</h2>
        <h2 className="ps-2">{consult.weight} kg</h2>
      </div>
      {(consult.exams?.length || 0) > 0 && (
        <div>
          <div className="flex flex-row items-center gap-1">
            <h2 className="font-semibold">Exames:</h2>
            {openExams ? (
              <FaRegSquareMinus
                onClick={() => setOpenExams(!openExams)}
                size={20}
                className="text-pink-900 cursor-pointer"
              />
            ) : (
              <FaRegSquarePlus
                onClick={() => setOpenExams(!openExams)}
                size={20}
                className="text-pink-900 cursor-pointer"
              />
            )}
          </div>
          {openExams
            ? consult.exams?.map((exam, index) => (
                <div className="ps-8" key={index}>
                  <div className="p-2 shadow-lg mb-2 bg-slate-100">
                    <div className="flex flex-row">
                      <h2 className="font-semibold">Exame:</h2>
                      <h2 className="ps-2">{exam.exam!.name}</h2>
                    </div>
                    <div className="flex flex-row">
                      <h2 className="font-semibold">Interpretação:</h2>
                      <h2 className="ps-2">{exam.interpretation}</h2>
                    </div>
                    <div className="flex flex-row">
                      <h2 className="font-semibold">Resultado normal?</h2>
                      <h2 className="ps-2">
                        {exam.isAbnormal ? "Sim." : "Não."}
                      </h2>
                    </div>
                    {exam.file != "" && (
                      <div className="flex flex-row justify-center">
                        <DownloadPDF
                          base64String={exam.file || ""}
                          fileName={exam.exam!.name}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))
            : ""}
        </div>
      )}
      {(consult.vaccines?.length || 0) > 0 && (
        <div>
          <div className="flex flex-row items-center gap-2">
            <h2 className="font-semibold">Vacinas Ministradas:</h2>
            {openVaccines ? (
              <FaRegSquareMinus
                onClick={() => setOpenVaccines(!openVaccines)}
                size={20}
                className="text-pink-900 cursor-pointer"
              />
            ) : (
              <FaRegSquarePlus
                onClick={() => setOpenVaccines(!openVaccines)}
                size={20}
                className="text-pink-900 cursor-pointer"
              />
            )}
          </div>
          <div className="ps-8">
            {openVaccines ? (
              <div className="p-1 flex flex-row">
                  {consult.vaccines?.map((vaccine, index) => (
                    <>
                      <h2
                        key={index}
                        className="p-1 font-semibold bg-purple-900 text-slate-50 rounded-md"
                      >
                        {vaccine.name}
                      </h2>
                    </>
                  ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}

      <div className="flex flex-row items-center gap-2">
        <h2 className="font-semibold">Detalhes do Veterinário e Clínica</h2>
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
              Vetrinário
            </h3>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">Nome:</h2>
              <h3>{consult.veterinarian.name}</h3>
            </div>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">CRVM: </h2>
              <h3 className="text-center">{consult.veterinarian.crmv}</h3>
            </div>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">Especialização: </h2>
              <h3 className="text-center">
                {translateSpecialization(consult.veterinarian.specialization)}
              </h3>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <h3 className="text-base font-semibold self-center">Clínica</h3>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">Clínica: </h2>
              <h3 className="text-center">{consult.clinic.name}</h3>
            </div>
            <div className="flex-row flex gap-1">
              <h2 className="font-semibold">Telefone: </h2>
              <h3 className="text-center">{formatPhoneNumber(consult.clinic.phone)}</h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
