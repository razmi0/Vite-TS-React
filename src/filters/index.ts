import { CheckedTypes, DataTypes, Pokemon } from "../sharedTypes";

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
    .slice(0, target /* userPoksLength */)
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

export function filterByFam(
  data: DataTypes,
  checkedTypes: CheckedTypes
): DataTypes {
  console.log("filterByFam computed !");
  if (!checkedTypes) return data;
  for (let i = 0; i < checkedTypes.length; i++) {
    if (checkedTypes[i].isChecked) {
      data = data.filter((item) => item.type.includes(checkedTypes[i].type));
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
