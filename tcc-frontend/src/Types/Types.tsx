import { IExamResult } from "../Components/ExamInputsComponent";

export const breedTypes = [
  { breed: "MONTAINS" },
  { breed: "FLOCKING" },
  { breed: "HERDING" },
  { breed: "RETRIEVERS" },
  { breed: "SPANIELS" },
  { breed: "POINTERS" },
  { breed: "SETTERS" },
];

export interface IKeepper {
  name: string;
  photo?: string;
  email: string;
  password: string;
  phone: string;
  address: IAddress;
}

type ROLES = "ROLE_USER" | "ROLE_VETERINARIAN";

export interface CustomJwtPayload {
  scope: ROLES;
  iat: number;
  iss: string;
  sub: string;
  exp: number;
}

export interface IBreedType {
  breed: string;
}

export interface IConsult {
  uuid: string;
  date: string;
  reason?: string;
  observations?: string;
  treatmentPlan?: string;
  consultType?: string;
  weight?: number;
  vaccines?: IVaccine[];
  exams?: IExams[];
  veterinarian: IVeterinarian;
  clinic: IClinic;
}

export interface IConsultCreate {
  vet: string;
  reason?: string;
  date: string;
  consultType?: string;
  clinic: string;
  dog:string;
  observations?: string;
  treatmentPlan?: string;
  weight?: number;
  exams?: IExamResult[];
  vaccines?: string[];
}

export interface IVaccine {
  uuid: string;
  name: string;
  description: string;
}

export interface IExams {
  uuid: string;
  exam?: IExamStatic;
  interpretation: string;
  isAbnormal: boolean;
  file?: string;
}

export interface IExamStatic {
  uuid: string;
  name: string;
  description: string;
}

export interface IExam {
  uuid: string;
  name: string;
  description: string;
}

export interface IVeterinarian {
  uuid: string;
  name: string;
  crmv: string;
  specialization: string;
}

export interface IClinic {
  uuid: string;
  name: string;
  phone: string;
  address: IAddress;
}

export interface IAddress {
  postalCode: string;
  city: string;
  locale: string;
  neighborhood: string;
  street: string;
  number: string;
}

export type TimeClassification =
  | "Last seen"
  | "1h ago"
  | "1d ago"
  | "7days ago"
  | "A month ago"
  | "More than a month ago";

export interface IPosition {
  localizator: string;
  latitude: number;
  longitude: number;
  date: string;
}
export interface IPositionRef {
  latitudeRef: number;
  localizator: string;
  longitudeRef: number;
}

export interface ILogin {
  username: string;
  password: string;
}

export const consultType = [
  { type: "ROUTINE" },
  { type: "EMERGENCY" },
  { type: "VACCINE" },
  { type: "SURGERY" },
];

export interface IConsultType {
  type: string;
}

