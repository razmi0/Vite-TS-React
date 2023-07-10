import { useState } from "react";
import { DataType, KeyOfDataType, TableProps } from "../types";
import { Thead, Tbody } from "./index";
import { sorting, calcPerf, setColor, setStyle } from "../utils";
import { colors } from "../utils/staticData";
import Pagination from "./Pagination";

let tableCount = 0;

/* --------- */
/* COMPONENT */
/* --------- */

function Table({ heading, data, sorts, isAsc = true }: TableProps) {
  tableCount += 1;
  let t1 = performance.now();
  if (!data) return <></>;

  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [activeSortBy, setactiveSortBy] = useState<KeyOfDataType>(sorts[0]);
  const [sortByAsc, setSortByAsc] = useState<boolean>(isAsc);
  /**
   * Pagination States
   */
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(16);
  const [activePage, setActivePage] = useState<number>(1);

  const page_length = end - start;

  const handleClickRow = (index: number, item: DataType) => {
    setSelectedIndex(index);
    console.log("handleClickRow, : ", item);
  };

  const handlePreviousPage = () => {
    if (start > 0) {
      setStart(start - page_length);
      setEnd(end - page_length);
      setActivePage(activePage - 1);
    }
  };

  const handleNextPage = () => {
    if (start < data.length - page_length) {
      setStart(start + page_length);
      setEnd(end + page_length);
      setActivePage(activePage + 1);
    }
  };

  const handleIndexedPage = (index: number) => {
    setStart(index * page_length - page_length);
    setEnd(index * page_length);
    setActivePage(index);
  };

  const handlePageLength = (length: number) => {};

  const sortedData = sorting(data, activeSortBy, sortByAsc);

  // sorting(data, activeSortBy, sortByAsc);

  return (
    <section className="table-section col-7">
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            {sorts.map((sortBy, index) => (
              <Thead
                key={index}
                color={setColor(index, colors, sorts.length)}
                sortBy={sortBy}
                onActive={setactiveSortBy}
                currentAsc={sortByAsc}
                onAsc={setSortByAsc}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(start, end).map((item, index) => (
            <Tbody
              item={item}
              index={index}
              handleClick={handleClickRow}
              selectedIndex={selectedIndex}
              key={item.id}
              setStyle={setStyle}
            />
          ))}
        </tbody>
      </table>
      <div className="d-flex flex-row flex-wrap align-content-center justify-content-end">
        <Pagination
          data_length={data.length}
          page_length={page_length}
          handleIndexedPage={handleIndexedPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          activePage={activePage}
        />
      </div>
      {/* {calcPerf(t1, tableCount, "Table")} */}
    </section>
  );
}

export default Table;
