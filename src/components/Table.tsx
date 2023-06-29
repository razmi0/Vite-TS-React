import { ReactNode, useEffect, useState } from "react";
import { DataTypes, KeyOfDataType, SortsTypes } from "../SharedTypes/types";
import THeader from "./THeader";
import TBody from "./TBody";

let count = 0;

interface Props {
  heading?: string;
  data: DataTypes;
  children?: ReactNode;
  sorts: SortsTypes;
  isAsc?: boolean;
  colors?: string[];
}

const setColor = (
  index: number,
  colors: string[] | undefined,
  sortsLength: number
): string => {
  if (!colors) return "primary";
  return index < colors.length ? colors[index] : colors[sortsLength % index];
};

const setStyle = (selectedIndex: number, index: number): string => {
  return selectedIndex === index ? "table-dark" : "table-secondary";
};

/* --------- */
/* COMPONENT */
/* --------- */

function Table({ heading, data, sorts, colors, isAsc = true }: Props) {
  if (!data) return <></>;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeSortBy, setactiveSortBy] = useState<KeyOfDataType>(sorts[0]);
  const [sortByAsc, setSortByAsc] = useState<boolean>(isAsc);

  const sorting = (
    data: DataTypes,
    sortBy: KeyOfDataType,
    asc: boolean
  ): DataTypes => {
    const t1 = performance.now();
    count += 1;

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

      const t2 = performance.now();
      const perf = t2 - t1;
      const perfPerPokemon = perf / data.length;
      console.table({ count, sortBy, asc, perf, perfPerPokemon });

      return data;
    }

    return data;
  };

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const sortedData = sorting(data, activeSortBy, sortByAsc);

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
      {console.log(`Table rendered ${count} times`)}
    </>
  );
}

export default Table;
