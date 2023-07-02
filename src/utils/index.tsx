// si dans checked ya un seul true alors j'affiche que celui la ou les autres si plus
// sinon j'affiche tous. donc si true j'affiche data[index] de checkedTypes[index] ===true
import { DataTypes, KeyOfDataType, CheckedTypes, Pokemon } from "../types";

/**
 * Perf measurement and displayed in console
 * @param t1
 * @param count
 * @param subject
 */
export function calcPerf(t1: number, count: number, subject: string) {
  const measure = performance.now() - t1;
  subject = subject + " Time";
  console.table({ count, [subject]: measure });
}
/**
 * Set color for thead
 * @param index
 * @param colors
 * @param sortsLength
 * @returns
 */
export const setColor = (
  index: number,
  colors: string[] | undefined,
  sortsLength: number
): string => {
  if (!colors) return "primary";
  return index < colors.length ? colors[index] : colors[sortsLength % index];
};

/**
 * Set style for tbody if user select a row
 * @param selectedIndex
 * @param index
 * @returns
 */
export const setStyle = (selectedIndex: number, index: number): string => {
  return selectedIndex === index ? "table-dark" : "table-secondary";
};

/**
 * Update user length to targetLength
 * @param targetLength
 * @param user
 * @returns
 */
export function changeLength<T>(targetLength: number, user: T[]): T[] {
  const diff = targetLength - user.length;
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
    if (user[i] === true) {
      arr.push(i);
    }
  }
  if (!arr.length) {
    return -1;
  }
  return arr;
}

let count = 0;
export const sorting = (
  data: DataTypes,
  sortBy: KeyOfDataType,
  asc: boolean
): DataTypes => {
  count++;
  const t1 = performance.now();
  if (Array.isArray(data)) {
    console.log("sorting computed !");

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

    calcPerf(t1, count, "sorting");

    return data;
  }
  calcPerf(t1, count, "sorting");

  return data;
};

export function mergeAtIndex<T extends any[], P extends any[]>(
  arr1: T,
  arr2: P,
  key1: string,
  key2: string
): any[] | undefined {
  const diff = arr1.length - arr2.length;
  diff !== 0 ? console.log("Unexpected inputs length. Diff = ", diff) : null;
  let merged = [];

  for (let i = 0; i < arr1.length; i++) {
    merged.push({
      [key1]: arr1[i],
      [key2]: arr2[i] === undefined ? false : arr2[i],
    });
  }
  return merged;
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
export function updateVisibility(arr1: DataTypes, arr2: CheckedTypes): void {
  console.log("updateVisibility");
  arr1.map((item) => {
    if (arr2) {
      arr2.map((checkedType) => {
        if (checkedType.isChecked) {
          if (item.type.includes(checkedType.type)) {
            item.visible = true;
          }
        }
      });
    }
  });
}

export function prepareData(rawData: Pokemon[]): DataTypes {
  const data = rawData.map((item: Pokemon) => {
    return {
      id: item.id,
      name: item.name.french,
      type: item.type,
      Attack: item.base["Attack"],
      Defense: item.base["Defense"],
      Speed: item.base["Speed"],
      SpAttack: item.base["Sp. Attack"],
      SpDefense: item.base["Sp. Defense"],
      HP: item.base["HP"],
      visible: true,
    };
  });
  return data;
}

export function pagination(pages: number[], activePage: number): number[] {
  const displayedPages = [];
  const totalPages = pages.length; // Assuming there are 10 pages in total. Replace this with the actual total number of pages.

  for (let i = activePage - 2; i <= activePage + 2; i++) {
    if (i >= 1 && i <= totalPages) {
      displayedPages.push(i);
    }
  }

  // If there are not enough pages on the left side, add more on the right side
  while (
    displayedPages.length < 5 &&
    displayedPages[displayedPages.length - 1] < totalPages
  ) {
    displayedPages.push(displayedPages[displayedPages.length - 1] + 1);
  }

  // If there are not enough pages on the right side, add more on the left side
  while (displayedPages.length < 5 && displayedPages[0] > 1) {
    displayedPages.unshift(displayedPages[0] - 1);
  }

  return displayedPages;
}
