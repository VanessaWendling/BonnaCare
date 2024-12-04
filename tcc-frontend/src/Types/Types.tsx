import { IExamResult } from "../Components/ExamInputsComponent";

export const breedTypes = [
{ breed: "MONTAINS" },
{ breed: "FLOCKING" },
{ breed: "HERDING" },
{ breed: "RETRIEVERS" },
{ breed: "SPANIELS" },
{ breed: "POINTERS" },
{ breed: "SETTERS" },
{ breed: "TERRIERS" },
{ breed: "WORKING" },
{ breed: "TOY" },
{ breed: "HOUNDS" },
{ breed: "NON_SPORTING" },
{ breed: "UTILITY" },
{ breed: "MIXED" },
{ breed: "PERSIAN" },
{ breed: "SIAMESE" },
{ breed: "MAINE_COON" },
{ breed: "BENGAL" },
{ breed: "SPHYNX" },
{ breed: "RAGDOLL" },
{ breed: "BRITISH_SHORTHAIR" },
{ breed: "AMERICAN_SHORTHAIR" },
{ breed: "SCOTTISH_FOLD" },
{ breed: "DEVON_REX" },
{ breed: "BURMESE" },
{ breed: "RUSSIAN_BLUE" }
];

export function translateSpecialization(specialization: string): string {
  switch (specialization) {
    case 'Small_Animal_Medical_Clinic':
      return 'Clínica Médica de Animais de Pequeno Porte';
    case 'Large_Animal_Medical_Clinic':
      return 'Clínica Médica de Animais de Grande Porte';
    case 'Cardiology':
      return 'Cardiologia';
    case 'Dermatology':
      return 'Dermatologia';
    case 'orthopedy':
      return 'Ortopedia';
    case 'Ophthalmology':
      return 'Oftalmologia';
    case 'Oncology':
      return 'Oncologia';
    case 'Neurology':
      return 'Neurologia';
    case 'Anesthesiology':
      return 'Anestesiologia';
    case 'Endocrinology':
      return 'Endocrinologia';
    case 'Pathology':
      return 'Patologia';
    case 'Wild_and_Exotic_Animal_Medicine':
      return 'Medicina de Animais Selvagens e Exóticos';
    case 'Surgery':
      return 'Cirurgia';
    case 'Animal_Behavior':
      return 'Comportamento Animal';
    case 'Nutrition':
      return 'Nutrição';
    default:
      return 'Especialização desconhecida';
  }
}

export function translateConsultType(consultType: string): string {
  switch (consultType) {
    case 'ROUTINE':
      return 'ROTINA';
    case 'EMERGENCY':
      return 'EMERGÊNCIA';
    case 'VACCINE':
      return 'VACINA';
    case 'SURGERY':
      return 'CIRURGIA';
    default:
      return 'DESCONHECIDO';
  }
}

export interface IKeeper {
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

export interface IFeedback {
  feedback: boolean;
  message?: string;
  action?: () => void;
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
  pet: string;
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
  | "Visto por último"
  | "1h atrás"
  | "1d atrás"
  | "7d atrás"
  | "Um mês atrás"
  | "Mais de um mês atrás";

export interface IPosition {
  localizator: string;
  latitude: number;
  longitude: number;
  date: string;
}
export interface IPositionRef {
  latitudeRef?: number;
  localizator: string;
  longitudeRef?: number;
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
