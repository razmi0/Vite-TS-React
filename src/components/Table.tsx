import { ReactNode, useState } from "react";
import {
  DataType,
  DataTypes,
  KeyOfDataType,
  SortsTypes,
} from "../SharedTypes/types";
import Button from "./Button";

interface Props {
  heading: string;
  data: DataTypes;
  children?: ReactNode;
  sorts: SortsTypes;
}

function Table({ heading, data, sorts }: Props) {
  if (!data) return <></>;

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [activeSortBy, setactiveSortBy] = useState<KeyOfDataType>(sorts[0]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };

  const setStyle = (selectedIndex: number, index: number): string => {
    return selectedIndex === index
      ? "list-group-item active"
      : "list-group-item";
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
        <td>{item.name}</td>
        <td>{item.type.join(" ")}</td>
        <td>{item.id}</td>
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
      <table className="list-group">
        <thead>
          <tr>
            {sorts.map((sortBy, index) => (
              <Button
                key={index}
                color="primary"
                sortBy={sortBy}
                onActive={setactiveSortBy}
              >
                Sort by
              </Button>
            ))}
          </tr>
        </thead>
        {sortedData.map((item, index) => (
          <PokemonRow
            item={item}
            index={index}
            handleClick={handleClick}
            selectedIndex={selectedIndex}
            key={item.id}
          />
        ))}
      </table>
      <hr />
      <div className="d-flex flex-row justify-content-evenly"></div>
      <hr />
    </>
  );
}

export default Table;
