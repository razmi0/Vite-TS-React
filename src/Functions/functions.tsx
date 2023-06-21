import { DataType, HasName, KeyOfDataType, KeyOf } from "../SharedTypes/types";



export function handle<T extends HasName>(item: T) {
  console.log(item.name);
}

export function ordering<T>(data: T[], sortBy: KeyOf<T> ): T[] {
  if (Array.isArray(data)) {
    data.sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
    return data;
  }
  return data;
}
