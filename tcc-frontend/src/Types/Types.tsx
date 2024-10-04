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
  photo?:string;
  email: string;
  password: string;
  phone: string;
  address: IAddress;
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

export interface IVaccine {
  uuid: string;
  name: string;
  description: string;
}

export interface IExams {
  uuid: string;
  exam: IExam;
  interpretation: string;
  isAbnormal: boolean;
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
  latitude: number;
  longitude: number;
  ref: boolean;
  timestamp: string;
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

export const mockConsult = [
  {
    uuid: "795b61f0-5511-4466-b419-4cfdb16e56a2",
    date: "2024-08-20T00:00:00.000+00:00",
    reason: "Cachorro encontra-se sem apetite.",
    observations: "Exames dentro do esperado dada a idade e peso.",
    treatmentPlan: "Cachorro deve ficar em observação por 3 dias.",
    consultType: "EMERGENCY",
    weight: 7.8,
    vaccines: [
      {
        uuid: "f27d118e-b80f-4de1-b24c-2fc1f4a3fab0",
        name: "Leucemia Felina (FeLV)",
        description:
          "Protege contra a leucemia felina, uma doença viral que pode ser fatal e é transmitida entre gatos.",
      },
      {
        uuid: "22e881e2-c0c3-4dd4-b453-0eae8b00b53f",
        name: "V4",
        description:
          "Protege contra doenças comuns em gatos, como panleucopenia, calicivirose e rinotraqueíte.",
      },
    ],
    exams: [
      {
        uuid: "ec70a7ab-0f96-408c-9c99-f163ad4487f0",
        exam: {
          uuid: "1fa2cca0-5ab1-4f94-859c-315fc59aaabb",
          name: "Bioquímico Sanguíneo",
          description:
            "Analisa componentes químicos no sangue, como glicose, proteínas, enzimas e eletrólitos, para avaliar a função de órgãos.",
          hibernateLazyInitializer: {},
        },
        interpretation: "sem alteração significativa",
        isAbnormal: false,
      },
    ],
    veterinarian: {
      uuid: "0ac836e2-7627-49bc-a426-117b0a5ea85f",
      name: "Vitória",
      crmv: "9023482-1",
      specialization: "Animal_Behavior",
    },
    clinic: {
      uuid: "409bd2ef-3f10-47fc-9f67-cfdfdc4b5465",
      name: "Imperial Vet",
      phone: "024876156684",
      address: {
        postalCode: "25675033",
        street: "Rua João Wendling",
        city: "Petrópolis",
        locale: "RJ",
        neighborhood: "Mosela",
        number: "145",
      },
    },
  },
  {
    uuid: "795b61f0-5511-4466-b419-4cfdb16e56a2",
    date: "2024-08-20T00:00:00.000+00:00",
    reason: "Cachorro encontra-se sem apetite.",
    observations: "Exames dentro do esperado dada a idade e peso.",
    treatmentPlan: "Cachorro deve ficar em observação por 3 dias.",
    consultType: "ROUTINE",
    weight: 7.8,
    vaccines: [
      {
        uuid: "f27d118e-b80f-4de1-b24c-2fc1f4a3fab0",
        name: "Leucemia Felina (FeLV)",
        description:
          "Protege contra a leucemia felina, uma doença viral que pode ser fatal e é transmitida entre gatos.",
      },
      {
        uuid: "22e881e2-c0c3-4dd4-b453-0eae8b00b53f",
        name: "V4",
        description:
          "Protege contra doenças comuns em gatos, como panleucopenia, calicivirose e rinotraqueíte.",
      },
    ],
    exams: [
      {
        uuid: "ec70a7ab-0f96-408c-9c99-f163ad4487f0",
        exam: {
          uuid: "1fa2cca0-5ab1-4f94-859c-315fc59aaabb",
          name: "Bioquímico Sanguíneo",
          description:
            "Analisa componentes químicos no sangue, como glicose, proteínas, enzimas e eletrólitos, para avaliar a função de órgãos.",
          hibernateLazyInitializer: {},
        },
        interpretation: "sem alteração significativa",
        isAbnormal: false,
      },
    ],
    veterinarian: {
      uuid: "0ac836e2-7627-49bc-a426-117b0a5ea85f",
      name: "Vitória",
      crmv: "9023482-1",
      specialization: "Animal_Behavior",
    },
    clinic: {
      uuid: "409bd2ef-3f10-47fc-9f67-cfdfdc4b5465",
      name: "Imperial Vet",
      phone: "024876156684",
      address: {
        postalCode: "25675033",
        city: "Petrópolis",
        street: "Rua João Wendling",
        locale: "RJ",
        neighborhood: "Mosela",
        number: "145",
      },
    },
  },
  {
    uuid: "795b61f0-5511-4466-b419-4cfdb16e56a2",
    date: "2024-08-20T00:00:00.000+00:00",
    reason: "Cachorro encontra-se sem apetite.",
    observations: "Exames dentro do esperado dada a idade e peso.",
    treatmentPlan: "Cachorro deve ficar em observação por 3 dias.",
    consultType: "VACCINE",
    weight: 7.8,
    vaccines: [
      {
        uuid: "f27d118e-b80f-4de1-b24c-2fc1f4a3fab0",
        name: "Leucemia Felina (FeLV)",
        description:
        "Protege contra a leucemia felina, uma doença viral que pode ser fatal e é transmitida entre gatos.",
      },
      {
        uuid: "22e881e2-c0c3-4dd4-b453-0eae8b00b53f",
        name: "V4",
        description:
        "Protege contra doenças comuns em gatos, como panleucopenia, calicivirose e rinotraqueíte.",
      },
    ],
    exams: [
      {
        uuid: "ec70a7ab-0f96-408c-9c99-f163ad4487f0",
        exam: {
          uuid: "1fa2cca0-5ab1-4f94-859c-315fc59aaabb",
          name: "Bioquímico Sanguíneo",
          description:
          "Analisa componentes químicos no sangue, como glicose, proteínas, enzimas e eletrólitos, para avaliar a função de órgãos.",
          hibernateLazyInitializer: {},
        },
        interpretation: "sem alteração significativa",
        isAbnormal: false,
      },
    ],
    veterinarian: {
      uuid: "0ac836e2-7627-49bc-a426-117b0a5ea85f",
      name: "Vitória",
      crmv: "9023482-1",
      specialization: "Animal_Behavior",
    },
    clinic: {
      uuid: "409bd2ef-3f10-47fc-9f67-cfdfdc4b5465",
      name: "Imperial Vet",
      phone: "024876156684",
      address: {
        postalCode: "25675033",
        city: "Petrópolis",
        street: "Rua João Wendling",
        locale: "RJ",
        neighborhood: "Mosela",
        number: "145",
      },
    },
  },
  {
    uuid: "494f53be-4ea3-4e8d-919e-00b3f899d0e4",
    date: "2024-08-20T00:00:00.000+00:00",
    consultType: "SURGERY",
    weight: 7.8,
    vaccines: [
      {
        uuid: "f27d118e-b80f-4de1-b24c-2fc1f4a3fab0",
        name: "Leucemia Felina (FeLV)",
        description:
        "Protege contra a leucemia felina, uma doença viral que pode ser fatal e é transmitida entre gatos.",
      },
      {
        uuid: "22e881e2-c0c3-4dd4-b453-0eae8b00b53f",
        name: "V4",
        description:
          "Protege contra doenças comuns em gatos, como panleucopenia, calicivirose e rinotraqueíte.",
      },
    ],
    exams: [
      {
        uuid: "1ff49df2-f932-41fa-9617-ab1391daf257",
        exam: {
          uuid: "1fa2cca0-5ab1-4f94-859c-315fc59aaabb",
          name: "Bioquímico Sanguíneo",
          description:
          "Analisa componentes químicos no sangue, como glicose, proteínas, enzimas e eletrólitos, para avaliar a função de órgãos.",
          hibernateLazyInitializer: {},
        },
        interpretation: "sem alteração significativa",
        isAbnormal: false,
      },
    ],
    veterinarian: {
      uuid: "0ac836e2-7627-49bc-a426-117b0a5ea85f",
      name: "Vitória",
      crmv: "9023482-1",
      specialization: "Animal_Behavior",
    },
    clinic: {
      uuid: "409bd2ef-3f10-47fc-9f67-cfdfdc4b5465",
      name: "Imperial Vet",
      phone: "024876156684",
      address: {
        postalCode: "25675033",
        street: "Rua João Wendling",
        city: "Petrópolis",
        locale: "RJ",
        neighborhood: "Mosela",
        number: "145",
      },
    },
  },
  {
    uuid: "eac7f813-ef8b-4c15-b3b4-b69fa8b7790f",
    date: "2024-08-20T00:00:00.000+00:00",
    weight: 7.8,
    consultType: "vava",
    vaccines: [
      {
        uuid: "f27d118e-b80f-4de1-b24c-2fc1f4a3fab0",
        name: "Leucemia Felina (FeLV)",
        description:
        "Protege contra a leucemia felina, uma doença viral que pode ser fatal e é transmitida entre gatos.",
      },
      {
        uuid: "22e881e2-c0c3-4dd4-b453-0eae8b00b53f",
        name: "V4",
        description:
        "Protege contra doenças comuns em gatos, como panleucopenia, calicivirose e rinotraqueíte.",
      },
    ],
    exams: [
      {
        uuid: "8c0f5b66-0ecb-4e19-abb4-f92f86123fdc",
        exam: {
          uuid: "1fa2cca0-5ab1-4f94-859c-315fc59aaabb",
          name: "Bioquímico Sanguíneo",
          description:
          "Analisa componentes químicos no sangue, como glicose, proteínas, enzimas e eletrólitos, para avaliar a função de órgãos.",
          hibernateLazyInitializer: {},
        },
        interpretation: "sem alteração significativa",
        isAbnormal: false,
      },
    ],
    veterinarian: {
      uuid: "0ac836e2-7627-49bc-a426-117b0a5ea85f",
      name: "Vitória",
      crmv: "9023482-1",
      specialization: "Animal_Behavior",
    },
    clinic: {
      uuid: "409bd2ef-3f10-47fc-9f67-cfdfdc4b5465",
      name: "Imperial Vet",
      phone: "024876156684",
      address: {
        postalCode: "25675033",
        street: "Rua João Wendling",
        city: "Petrópolis",
        locale: "RJ",
        neighborhood: "Mosela",
        number: "145",
      },
    },
  },
];


export const mockPetsPosition = [
  {
    latitude: -22.500993,
    longitude: -43.200556,
    ref: false,
    timestamp: "2024-09-14T09:36:03.874Z",
  },
  {
    latitude: -22.497333,
    longitude: -43.203535,
    ref: false,
    timestamp: "2024-09-25T11:49:03.874Z",
  },
  {
    latitude: -22.498631,
    longitude: -43.203832,
    ref: false,
    timestamp: "2024-09-22T09:55:03.874Z",
  },
  {
    latitude: -22.499585,
    longitude: -43.201405,
    ref: false,
    timestamp: "2024-09-14T22:44:03.874Z",
  },
  {
    latitude: -22.500964,
    longitude: -43.201326,
    ref: false,
    timestamp: "2024-09-16T05:21:03.874Z",
  },
  {
    latitude: -22.498174,
    longitude: -43.201389,
    ref: false,
    timestamp: "2024-09-06T14:46:03.874Z",
  },
  {
    latitude: -22.501273,
    longitude: -43.202526,
    ref: false,
    timestamp: "2024-09-08T18:31:03.874Z",
  },
  {
    latitude: -22.498644,
    longitude: -43.204431,
    ref: false,
    timestamp: "2024-09-23T02:30:03.874Z",
  },
  {
    latitude: -22.500823,
    longitude: -43.203304,
    ref: false,
    timestamp: "2024-09-15T12:24:03.874Z",
  },
  {
    latitude: -22.500593,
    longitude: -43.200019,
    ref: false,
    timestamp: "2024-09-06T00:23:03.874Z",
  },
];
