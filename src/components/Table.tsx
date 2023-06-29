import { ReactNode, useEffect, useState } from "react";
import { DataTypes, KeyOfDataType, SortsTypes } from "../SharedTypes/types";
import THeader from "./THeader";
import TBody from "./TBody";

interface Props {
  heading: string;
  data: DataTypes;
  children?: ReactNode;
  sorts: SortsTypes;
  isAsc?: boolean;
  colors?: string[];
}

let count = 0;

function Table({ heading, data, sorts, colors, isAsc = true }: Props) {
  if (!data) return <></>;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeSortBy, setactiveSortBy] = useState<KeyOfDataType>(sorts[0]);
  const [sortByAsc, setSortByAsc] = useState<boolean>(isAsc);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const setStyle = (selectedIndex: number, index: number): string => {
    return selectedIndex === index ? "table-dark" : "table-secondary";
  };

  const sorting = (
    data: DataTypes,
    sortBy: KeyOfDataType,
    asc: boolean
  ): DataTypes => {
    const t1 = performance.now();
    count += 1;
    console.log(`Sorting for the ${count} and by ${sortBy}`);

    if (Array.isArray(data)) {
      data.sort((a, b) => {
        const valueA = a[sortBy];
        const valueB = b[sortBy];

        return valueA > valueB ? (asc ? 1 : -1) : asc ? -1 : 1;

        // if (typeof valueA === "number" && typeof valueB === "number") {
        //   return asc ? valueA - valueB : valueB - valueA;
        // } else if (typeof valueA === "string" && typeof valueB === "string") {
        //   return asc
        //     ? valueA.localeCompare(valueB)
        //     : valueB.localeCompare(valueA);
        // } else if (Array.isArray(valueA) && Array.isArray(valueB)) {
        //   return asc
        //     ? valueA[0].localeCompare(valueB[0])
        //     : valueB[0].localeCompare(valueA[0]);
        // } else {
        //   return 0;
        // }
      });

      const t2 = performance.now();
      console.log(
        `Sorting took ${t2 - t1} milliseconds. ${
          (t2 - t1) / data.length
        } ms / pokemon.`
      );

      return data;
    }

    return data;
  };

  const setColor = (
    index: number,
    colors: string[] | undefined,
    sortsLength: number
  ): string => {
    if (!colors) return "primary";
    return index < colors.length ? colors[index] : colors[sortsLength % index];
  };

  const sortedData = sorting(data, activeSortBy, sortByAsc);
  console.log(`Table rendered ${count} times`);
  return (
    <>
      <h1 className="my-2"> {heading} </h1>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            {sorts.map((sortBy, index) => (
              <THeader
                key={index}
                color={setColor(index, colors, sorts.length)}
                sortBy={sortBy}
                onActive={setactiveSortBy}
                currentAsc={sortByAsc}
                onAsc={setSortByAsc}
              ></THeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <TBody
              item={item}
              index={index}
              handleClick={handleClick}
              selectedIndex={selectedIndex}
              key={item.id}
              setStyle={setStyle}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
