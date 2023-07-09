import { CheckedTypes, DataTypes, Pokemon } from "../types";

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
 * @param data
 * @param target
 * @returns
 */
export function filterByQuantity(data: DataTypes, target: number): DataTypes {
  console.log("filterByQuantity computed !");
  for (let i = 0; i < data.length; i++) {
    if (i < target) {
      data[i].visible = true;
    } else {
      data[i].visible = false;
    }
  }
  return data;
}

export function filterByPure(data: DataTypes): DataTypes {
  console.log("filterByPure computed !");
  data.map((item) => {
    if (item.type.length === 1) {
      item.visible = true;
    } else {
      item.visible = false;
    }
  });
  return data;
}

export function filterByDouble(data: DataTypes): DataTypes {
  console.log("filterByDouble computed !");
  data.map((item) => {
    if (item.type.length === 2) {
      item.visible = true;
    } else {
      item.visible = false;
    }
  });
  return data;
}

export function filterByFam(
  data: DataTypes,
  checkedTypes: CheckedTypes
): DataTypes {
  console.log("filterByFam computed !");
  if (!checkedTypes) return data;
  for (let i = 0; i < checkedTypes.length; i++) {
    if (checkedTypes[i].isChecked) {
      // data = data.filter((item) => item.type.includes(checkedTypes[i].type));
      data.map((item) => {
        if (item.type.includes(checkedTypes[i].type)) {
          item.visible = true;
        } else {
          item.visible = false;
        }
      });
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
  data.map(({ type, visible }) => {
    if (!visible) return;
    type.length === 1 ? counts.pureLength++ : counts.doubleLength++;
  });
  return counts;
}
