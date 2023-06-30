// si dans checked ya un seul true alors j'affiche que celui la ou les autres si plus
// sinon j'affiche tous. donc si true j'affiche data[index] de checkedTypes[index] ===true
import { DataTypes, KeyOfDataType } from "../SharedTypes/types";
/**
 * if one true in user push index ; if arra no length return -1 (all false) : return arr
 */
export function isChecked(user: boolean[]): number[] | -1 {
  let arr = [];
  for (let i = 0; i < user.length; i++) {
    console.log("one true");
    if (user[i] === true) {
      arr.push(i);
    }
  }
  if (!arr.length) {
    console.log("all false no length");
    return -1;
  }
  return arr;
}

export const sorting = (
  data: DataTypes,
  sortBy: KeyOfDataType,
  asc: boolean
): DataTypes => {
  if (Array.isArray(data)) {
    data.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === "number" && typeof valueB === "number") {
        return asc ? valueA - valueB : valueB - valueA;
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return asc
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else if (Array.isArray(valueA) && Array.isArray(valueB)) {
        return asc
          ? valueA[0].localeCompare(valueB[0])
          : valueB[0].localeCompare(valueA[0]);
      } else {
        return 0;
      }
    });

    // console.table({ sortingCount, sortBy, asc });

    return data;
  }

  return data;
};
