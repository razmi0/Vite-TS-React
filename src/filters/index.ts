import { checkedFams, DataTypes, Pokemon } from "../types";
import { DataType } from "../types/index";
import type Fuse from "fuse.js";

/**
 * return all items with visible set to true
 * @param data
 * @returns
 */
export function filterByVisibility(data: DataTypes) {
  console.log("filterByVisibility computed !");

  return data.filter((item) => item.visible);
}

/**
 * return array at correct length
 * @param rawData
 * @param target
 * @returns
 */
export function filterByQuantity(
  rawData: Pokemon[],
  target: number
): DataTypes {
  console.log("filterByQuantity computed !");

  const data = rawData
    .slice(0, target /* userrawLength */)
    .map((item: Pokemon) => {
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

type ModeType = "PURE" | "DOUBLE";

export function filterByMode(arr: DataTypes, mode: ModeType): DataTypes {
  console.log("filterByPure computed !");
  arr.map((item) => {
    if (mode === "PURE") {
      item.type.length === 1 ? (item.visible = true) : (item.visible = false);
    }
    if (mode === "DOUBLE") {
      item.type.length === 2 ? (item.visible = true) : (item.visible = false);
    }
  });
  return (arr = filterByVisibility(arr));
}

export function filterByFam(
  data: DataTypes,
  checkedFams: checkedFams
): DataTypes {
  console.log("filterByFam computed !");
  if (!checkedFams) return data;
  for (let i = 0; i < checkedFams.length; i++) {
    if (checkedFams[i].isChecked) {
      data = data.filter((item) => item.type.includes(checkedFams[i].type));
    }
  }
  return data;
}

/**
 * filterBytypeLength
 */
export function countTypes(data: DataTypes): {
  pureLength: number;
  doubleLength: number;
} {
  const counts = { pureLength: 0, doubleLength: 0 };
  data.map(({ type }) => {
    type.length === 1 ? counts.pureLength++ : counts.doubleLength++;
  });
  return counts;
}

/**
 * filterBySearch
 */
export function filterBySearch(
  data: DataTypes,
  result: Fuse.FuseResult<DataType>[]
): DataTypes {
  if (!result) return data;
  const matchData: DataTypes = [];
  console.log("filterBySearch computed !");
  const refs = result.map((item) => {
    return { idx: item.refIndex as number, score: item.score as number };
  });
  for (let i = 0; i < refs.length; i++) {
    if (refs[i].score < 0.1) {
      matchData.push(data.at(refs[i].idx) as DataType);
    }
  }
  return matchData;
}
