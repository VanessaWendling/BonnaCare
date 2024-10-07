import { Dispatch, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaRegSquarePlus } from "react-icons/fa6";
import { IExam } from "../Types/Types";
import { Check } from "./Check";
import { Input } from "./Input";

export interface IExamResult {
  exam: string;
  interpretation: string;
  isAbnormal: boolean;
}

export interface IDynamicExams {
  listOfExams: IExam[];
  exams: IExamResult[];
  setExams: Dispatch<IExamResult[]>;
}

export const DynamicExams = ({ listOfExams, exams, setExams }: IDynamicExams) => {
  const [selectedExams, setSelectedExams] = useState<string[]>([]);

  const addExam = () => {
    setExams([...exams, { exam: "", interpretation: "", isAbnormal: false }]);
    setSelectedExams([...selectedExams, ""]);
  };

  const updateExam = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updatedExams = exams.map((exam, i) =>
      i === index ? { ...exam, [field]: value } : exam
    );
    setExams(updatedExams);
  };

  const removeExam = (index: number) => {
    setExams(exams.filter((_, i) => i !== index));
    setSelectedExams(selectedExams.filter((_, i) => i !== index));
  };

  const handleSelectExam = (index: number, value: string) => {
    const updatedSelectedExams = [...selectedExams];
    updatedSelectedExams[index] = value;
    setSelectedExams(updatedSelectedExams);
    updateExam(index, "exam", value);
  };
  return (
    <div className="flex flex-row items-center gap-4">
      {exams.map((exam, index) => (
        <div key={index} className="border-2 border-amber-900 p-2 rounded-md">
          <div className="flex justify-end">
            <AiOutlineClose
              size={14}
              className="cursor-pointer "
              onClick={() => removeExam(index)}
            />
          </div>
          <div className="pb-2 flex flex-col">
            <label className="font-bold">Exam:</label>
            <select
              value={selectedExams[index] || ""}
              className="rounded-md p-2"
              onChange={(e) => handleSelectExam(index, e.target.value)}
            >
              {listOfExams.map((item: IExam) => (
                <option key={item.uuid} value={item.uuid}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="pb-2">
            <label className="font-bold">Interpretation:</label>
            <Input
              placeholder="Interpretation"
              value={exam.interpretation}
              onChange={(e) =>
                updateExam(index, "interpretation", e.target.value)
              }
              isLarge
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <label className="font-bold flex-row">Abnormal:</label>
            <Check
              check={exam.isAbnormal}
              setCheck={() => updateExam(index, "isAbnormal", !exam.isAbnormal)}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <FaRegSquarePlus
          size={34}
          className="cursor-pointer text-orange-700"
          onClick={addExam}
        />
      </div>
    </div>
  );
};
