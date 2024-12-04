import { Dispatch, FormEvent, useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  getListOfExams,
  getListOfVaccines,
} from "../../Service/vaccine-exam-endpoints";
import {
  consultType,
  IClinic,
  IConsultType,
  IExam,
  IVaccine,
  translateConsultType,
} from "../../Types/Types";
import { Check } from "../Check";
import { IExamResult, DynamicExams } from "../ExamInputsComponent";
import { Input } from "../Input";
import { Button } from "../Button";
import { createNewConsult } from "../../Service/consult-endpoints";

interface IAddConsult {
  open: boolean;
  setOpen: Dispatch<boolean>;
  refresh: boolean;
  setRefresh: Dispatch<boolean>;
  vet: string;
  vetUuid: string;
  petUuid: string;
  listOfClinicsVet: IClinic[];
}

export const CardAddConsult = ({
  open,
  setOpen,
  vet,
  vetUuid,
  petUuid,
  listOfClinicsVet,
  refresh,
  setRefresh,
}: IAddConsult) => {
  const [listOfConsultTypes, setListOfConsultTypes] =
    useState<IConsultType[]>(consultType);
  const [listOfClinics, setListOfClinics] =
    useState<IClinic[]>(listOfClinicsVet);
  const [listOfVaccines, setListOfVaccines] = useState<IVaccine[]>([]);
  const [listOfExams, setListOfExams] = useState<IExam[]>([]);

  const [changePage, setChangePage] = useState<number>(1);
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [selectedConsultType, setSelectedConsultType] = useState<string>("");
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);

  const [reason, setReason] = useState<string>("");
  const [observations, setObservations] = useState<string>("");
  const [weight, setWeight] = useState<number>();
  const [date, setDate] = useState<string>();
  const [treatmentPlan, setTreatmentPlan] = useState<string>("");
  const [checkVaccine, setCheckVaccine] = useState<boolean>(false);
  const [checkExam, setCheckExam] = useState<boolean>(false);
  const [exams, setExams] = useState<IExamResult[]>([
    { exam: "", interpretation: "", isAbnormal: false, file: "" },
  ]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (checkExam == false) {
      setExams([]);
    }
    if (checkVaccine == false) {
      setSelectedVaccines([]);
    }
    // console.log({
    //   vetUuid,
    //   selectedClinic,
    //   selectedConsultType,
    //   date,
    //   reason,
    //   observations,
    //   weight,
    //   checkExam,
    //   exams,
    //   checkVaccine,
    //   selectedVaccines,
    //   treatmentPlan,
    //   petUuid
    // });

    createNewConsult({
      clinic: selectedClinic,
      date: date!,
      vet: vetUuid,
      consultType: selectedConsultType,
      exams: exams,
      observations: observations,
      reason: reason,
      treatmentPlan: treatmentPlan,
      vaccines: selectedVaccines,
      weight: weight,
      pet: petUuid,
    })
      .then(() => {
        setOpen(!open);
        setRefresh(!refresh);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (listOfClinics.length > 0) {
      setSelectedClinic(listOfClinics[0].uuid);
    }
  }, [listOfClinics]);

  // Atualiza o estado do tipo de consulta quando a lista de tipos mudar
  useEffect(() => {
    if (listOfConsultTypes.length > 0) {
      setSelectedConsultType(listOfConsultTypes[0].type);
    }
  }, [listOfConsultTypes]);

  const fetchData = async () => {
    try {
      const [vaccineResponse, examResponse] = await Promise.all([
        getListOfVaccines(),
        getListOfExams(),
      ]);

      setListOfVaccines(vaccineResponse.data);
      setListOfExams(examResponse.data);
    } catch (error: any) {
      console.error("Error fetching data:", error);
      // Adicionar mais detalhes no tratamento de erro
      if (error.response) {
        console.log("Server responded with status:", error.response.status);
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        console.log("Request made but no response received", error.request);
      } else {
        console.log("Error setting up request:", error.message);
      }
    }
  };

  return (
    <div
      className={
        open
          ? "fixed inset-0 flex justify-center items-center  z-10 bg-black bg-opacity-70 duration-300"
          : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
      }
    >
      <div className="w-[800px] h-[500px] bg-purple-300 p-4 flex flex-col rounded-md relative items-center">
        <div className="flex flex-row justify-between w-full">
          <AiOutlineClose
            size={28}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
          <div className="flex flex-row">
            {changePage > 1 ? (
              <AiOutlineLeft
                className="cursor-pointer"
                onClick={() => setChangePage(changePage - 1)}
                size={28}
              />
            ) : (
              ""
            )}
            {changePage < 3 ? (
              <AiOutlineRight
                className="cursor-pointer"
                onClick={() => setChangePage(changePage + 1)}
                size={28}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <>
          {changePage === 1 ? (
            <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-bold w-[500px] flex-wrap text-center">
              <span className="text-pink-900">Nova </span> Consulta
            </h1>
          ) : (
            ""
          )}
          {changePage === 2 ? (
            <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-bold">
              Exames
            </h1>
          ) : (
            ""
          )}
          {changePage === 3 ? (
            <h1 className="text-3xl sm:text-3xl md:text-3xl lg:text-4xl font-bold flex-wrap text-center w-[500px]">
              Vacinas
            </h1>
          ) : (
            ""
          )}
        </>
        <form onSubmit={handleSubmit} className="flex gap-4 p-4 w-full m-4">
          {changePage === 1 ? (
            <div className="flex-row gap-8 justify-evenly w-full flex">
              <div className="gap-4">
                <div className="flex flex-col py-2">
                  <label className="font-bold">Veterinário Responsável</label>
                  <Input
                    className="p-2 rounded-2xl bg-slate-200"
                    type="text"
                    disabled={true}
                    placeholder={vet}
                    value={vet}
                  />
                </div>
                <div className="flex flex-col py-2 w-full">
                  <label className="font-bold">Clínica</label>
                  <select
                    value={selectedClinic}
                    className="rounded-md p-2"
                    onChange={(e) => setSelectedClinic(e.target.value)}
                  >
                    {listOfClinics.map((item: IClinic) => (
                      <option key={item.uuid} value={item.uuid}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col py-2 w-full">
                  <label className="font-bold">Tipo de Consulta</label>
                  <select
                    value={selectedConsultType}
                    className="rounded-md p-2"
                    onChange={(e) => setSelectedConsultType(e.target.value)}
                  >
                    {listOfConsultTypes.map((item: IConsultType) => (
                      <option value={item.type}>
                        {translateConsultType(item.type)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col py-2 w-full">
                  <label className="font-bold">Data</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                </div>
              </div>
              <div className="gap-4">
                <div className="flex flex-col py-2">
                  <label className="font-bold">Motivo</label>
                  <Input
                    className="p-2 rounded-2xl"
                    type="text"
                    placeholder="Motivo da Consulta"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="font-bold">Observação</label>
                  <Input
                    type="text"
                    isLarge={true}
                    placeholder="Detalhes"
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                  />
                </div>
                <div className="flex flex-col py-2">
                  <label className="font-bold">Peso</label>
                  <Input
                    type="number"
                    placeholder="0,0 kg"
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {changePage === 2 ? (
            <>
              <div className=" flex-col gap-8 justify-evenly w-full flex">
                <div className="gap-4">
                  <div className="flex flex-col">
                    <div className="flex flex-row items-center gap-2 pb-2 justify-center">
                      <label className="font-bold ">
                        Foi necessário realizar algum exame?
                      </label>
                      <Check check={checkExam} setCheck={setCheckExam} />
                    </div>
                    {checkExam == true && (
                      <div className="w-[730px] h-full overflow-x-auto">
                        <DynamicExams
                          listOfExams={listOfExams}
                          exams={exams}
                          setExams={setExams}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {changePage === 3 ? (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <div className="flex flex-row items-center gap-2 pb-2">
                <label className="font-bold">Foi aplicado alguma vacina?</label>
                <Check check={checkVaccine} setCheck={setCheckVaccine} />
              </div>
              {checkVaccine == true && listOfVaccines != undefined && (
                <select
                  multiple
                  value={selectedVaccines}
                  className="rounded-md p-2 h-[150px] w-[300px] self-center border-2 border-amber-900"
                  onChange={(e) => {
                    const options = e.target.options;
                    const selectedValues: string[] = [];

                    for (let i = 0; i < options.length; i++) {
                      if (options[i].selected) {
                        selectedValues.push(options[i].value);
                      }
                    }

                    setSelectedVaccines(selectedValues); // Atualiza o estado com os valores selecionados
                  }}
                >
                  {listOfVaccines.map(
                    (
                      item: IVaccine // Corrigi o tipo de item para IVaccine
                    ) => (
                      <option key={item.uuid} value={item.uuid}>
                        {item.name}
                      </option>
                    )
                  )}
                </select>
              )}
              <div className="flex flex-col py-2">
                <label className="font-bold">Plano de Tratamento</label>
                <Input
                  className="p-2 rounded-2xl w-[500px]"
                  type="text"
                  isLarge
                  placeholder="Plano de tratamento"
                  value={treatmentPlan}
                  onChange={(e) => setTreatmentPlan(e.target.value)}
                />
              </div>
              <div className="flex-grow basis-1/4">
              <button
                type="submit"
                className=" bg-pink-900 rounded-md py-2 px-5 max-w-32 text-slate-50"
              >
                Salvar
              </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};
