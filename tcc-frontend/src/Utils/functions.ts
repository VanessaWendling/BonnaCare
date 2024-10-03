import { IPosition, TimeClassification } from "../Types/Types";

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

