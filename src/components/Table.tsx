import { ReactNode, useState } from "react";
import {
  DataType,
  DataTypes,
  KeyOfDataType,
  SortsTypes,
} from "../SharedTypes/types";
import THeader from "./Theader";

interface Props {
  heading: string;
  data: DataTypes;
  children?: ReactNode;
  sorts: SortsTypes;
  colors? : string[];
}

function Table({ heading, data, sorts, colors }: Props) {
  if (!data) return <></>;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [activeSortBy, setactiveSortBy] = useState<KeyOfDataType>(sorts[0]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const setStyle = (selectedIndex: number, index: number): string => {
    return selectedIndex === index
      ? "table-dark"
      : "table-secondary";
  };

  const PokemonRow = ({
    item,
    index,
    handleClick,
    selectedIndex,
  }: {
    item: DataType;
    index: number;
    handleClick: (index: number, item: DataType) => void;
    selectedIndex: number;
  }) => {
    return (
      <tr
        className={setStyle(selectedIndex, index)}
        key={item.id}
        onClick={() => {
          handleClick(index, item);
        }}
      >
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.type.join(" ")}</td>
      </tr>
    );
  };

  const sorting = (data: DataTypes, sortBy: KeyOfDataType): DataTypes => {
    if (Array.isArray(data)) {
      data.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
      return data;
    }
    return data;
  };

  const sortedData = sorting(data, activeSortBy);

  return (
    <>
      <h1 className="my-2"> {heading} </h1>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            {sorts.map((sortBy, index) => (
              <THeader
                key={index}
                color={ colors ? colors[index] : "primary"}
                sortBy={sortBy}
                onActive={setactiveSortBy}
              >
                Sort by
              </THeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <PokemonRow
              item={item}
              index={index}
              handleClick={handleClick}
              selectedIndex={selectedIndex}
              key={item.id}
            />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
