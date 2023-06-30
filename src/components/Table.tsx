import { useState } from "react";
import { KeyOfDataType, TableProps } from "../SharedTypes";
import { THeader, TBody } from "./index";
import { sorting, calcPerf, setColor, setStyle } from "../utils";

let sortingCount = 0;
let tableCount = 0;

/* --------- */
/* COMPONENT */
/* --------- */

function Table({ heading, data, sorts, colors, isAsc = true }: TableProps) {
  tableCount += 1;
  let t1 = performance.now();
  if (!data) return <></>;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeSortBy, setactiveSortBy] = useState<KeyOfDataType>(sorts[0]);
  const [sortByAsc, setSortByAsc] = useState<boolean>(isAsc);

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
          {/* si l'index ici =  un des number de isChecked(checkTypes) */}
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
      {/* {calcPerf(t1, tableCount, "Table")} */}
    </>
  );
}

export default Table;
