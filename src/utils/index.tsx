// si dans checked ya un seul true alors j'affiche que celui la ou les autres si plus
// sinon j'affiche tous. donc si true j'affiche data[index] de checkedTypes[index] ===true
import { DataTypes, KeyOfDataType, KeyOf, CheckedTypes } from "../SharedTypes";

/**
 * Perf measurement and displayed in console
 * @param t1
 * @param count
 * @param subject
 */
export function calcPerf(t1: number, count: number, subject: string) {
  performance.now() - t1;
  console.table({ count, subject: performance.now() - t1 });
}

/**
 * Update user length to targetLength
 * @param targetLength
 * @param user
 * @returns
 */
export function changeLength<T>(targetLength: number, user: T[]): T[] {
  const diff = targetLength - user.length;
  // console.log(`diff : ${diff}   ||   targetLength: ${targetLength}`);
  if (diff > 0) {
    const filler = new Array(diff).fill(false);
    user = user.concat(filler);
  } else if (diff < 0) {
    user = user.slice(0, diff);
  }
  return user;
}

/**
 * if one true in user push index ; if arra no length return -1 (all false) : return arr
 */
export function isIndexedChecked(user: boolean[]): number[] | -1 {
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

export function mergeAtIndex<T extends any[], P extends any[]>(
  arr1: T,
  arr2: P,
  key1: string,
  key2: string
): any[] | undefined {
  let merged = [];
  const diff = arr1.length - arr2.length;
  if (diff === 0) {
    for (let i = 0; i < arr1.length; i++) {
      merged.push({
        [key1]: arr1[i],
        [key2]: arr2[i],
      });
    }
    return merged;
  } else {
    console.warn("mergeAtIndex impossible because diff = ", diff);
    return;
  }
}
/**
 * If all false return true ; if at least one true return false
 * @param arr
 * @returns
 */
export function checkIfAllFalse(arr: boolean[]): boolean {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === true) {
      return false;
    }
  }
  return true;
}

/**
 * Update visibility of pokemon_display in function of checkedTypes | onPureSwitch | onDoubleSwitch
 * @param arr1 pokemon_display
 * @param arr2 checkedTypes
 */
export function updateVisibility(
  arr1: DataTypes,
  arr2: CheckedTypes,
  onPureSwitch: boolean,
  onDoubleSwitch: boolean
): void {
  arr1.map((item) => {
    item.visible = false;
    if (arr2) {
      arr2.map((type) => {
        if (type.isChecked) {
          if (item.type.includes(type.type)) {
            if (item.type.length === 1 && onPureSwitch) {
              item.visible = true;
            } else if (item.type.length > 1 && !onPureSwitch) {
              item.visible = true;
            }
          }
        }
      });
    }
  });
}
