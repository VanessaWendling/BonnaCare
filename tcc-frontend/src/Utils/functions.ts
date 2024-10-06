
export function convertData(data: string, method: string): string {
  switch (method) {
    case "getDay":
      return data.substring(8, 10);
    case "getMonth":
      return data.substring(5, 7);
    case "getYear":
      return data.substring(0, 4);
    case "getReformattedData":
      return `${data.substring(8, 10)}/${data.substring(5, 7)}/${data.substring(0, 4)}`;
    default:
      return data;
  }
}

export interface IAge {
  years: number;
  months: number
}

export function calculateAge(date: string): IAge {

  const [day, month, year] = date.split("/").map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();

  if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birthDate.getDate())) {
    ageYears--;
    ageMonths += 12;
  }

  // Ajustar o número de meses se a data de nascimento for posterior ao dia atual no mês
  if (today.getDate() < birthDate.getDate()) {
    ageMonths--;
    if (ageMonths < 0) {
      ageMonths += 12;
      ageYears--;
    }
  }

  return { years: ageYears, months: ageMonths };
}

export function formatPhoneNumber(phone: string) {
  const cleaned = phone.replace(/\D/g, ''); // Remove tudo que não for número
  const match = cleaned.match(/^(\d{3})(\d{4,5})(\d{4})$/);
  if (match)
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  return null;
}