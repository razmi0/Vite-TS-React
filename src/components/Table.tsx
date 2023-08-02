import { useState } from "react";
import { DataType, KeyOfDataType, TableProps } from "../types";
import { Thead, Tbody } from "./";
import { sorting } from "../utils";
import Pagination from "./Pagination";
import {
  Container,
  TableUi,
  HStack,
  VStack,
  Section,
  TBodyUi,
  TrUi,
  THeadUi,
  Heading,
} from "../ui";

let tableCount = 0;
let initialLength = 10;

/* --------- */
/* COMPONENT */
/* --------- */

function Table({ data, sorts, isAsc = true }: TableProps) {
  //#region logic
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [selectedTh, setSelectedTh] = useState<number>(-1);

  tableCount += 1;
  let t1 = performance.now();
  if (!data) return <></>;

  const [activeSortBy, setactiveSortBy] = useState<KeyOfDataType>(sorts[0]);
  const [sortByAsc, setSortByAsc] = useState<boolean>(isAsc);
  /**
   * Pagination States
   */
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(initialLength);
  const [activePage, setActivePage] = useState<number>(1);

  const page_length = end - start;

  const isSelectedRow = (selectedIndex: number, index: number): boolean => {
    return selectedIndex === index ? true : false;
  };

  const isSelectedTh = (selectedTh: number, index: number): boolean => {
    return selectedTh === index ? true : false;
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

  const handleClickRow = (index: number) => {
    setSelectedIndex(index);
  };
  const handleClickTh = (index: number) => {
    setSelectedTh(index);
  };

  const handlePageLength = (length: number) => {};

  const sortedData = sorting(data, activeSortBy, sortByAsc);

  //#endregion logic

  return (
    <>
      <Container mode="paginationH">
        <Pagination
          data_length={data.length}
          page_length={page_length}
          handleIndexedPage={handleIndexedPage}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          activePage={activePage}
        />
      </Container>
      <TableUi>
        <THeadUi>
          <tr>
            {sorts.map((sortBy, index) => (
              <Thead
                sortBy={sortBy}
                index={index}
                handleClick={handleClickTh}
                onActive={setactiveSortBy}
                currentAsc={sortByAsc}
                onAsc={setSortByAsc}
                selectedTh={selectedTh}
                key={index}
                isSelectedTh={isSelectedTh}
              />
            ))}
          </tr>
        </THeadUi>

        <TBodyUi>
          {sortedData.slice(start, end).map((item, index) => (
            <Tbody
              item={item}
              index={index}
              handleClick={handleClickRow}
              selectedIndex={selectedIndex}
              key={item.id}
              isSelectedRow={isSelectedRow}
            />
          ))}
        </TBodyUi>
      </TableUi>
    </>
  );
}

export default Table;
