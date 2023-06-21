import { ReactNode, useState } from "react";
import { DataType, DataTypes } from "../SharedTypes/types";
import { KeyOfDataType } from "../SharedTypes/types";

interface Props {
  heading: string;
  onSelectItem: (item: DataType) => void;
  dataFunction?: (items: DataTypes, sortBy : KeyOfDataType) => DataTypes;
  data: DataTypes;
  sortBy: KeyOfDataType
  children?: ReactNode;
}

function ListGroup({
  heading,
  onSelectItem,
  dataFunction,
  data,
  sortBy,
  children,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const setStyle = (selectedIndex: number, index: number): string => {
    return selectedIndex === index
      ? "list-group-item active"
      : "list-group-item";
  };

  if (dataFunction) {
    data = dataFunction(data, sortBy);
  }

  return (
    <>
      <h1 className="my-2"> {heading} </h1>
      <ul className="list-group">
        {data.map((item, index) => (
          <li
            className={setStyle(selectedIndex, index)}
            key={item.id}
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
          >
            {item.name} | {item.type.join(" ")} | {item.id}
          </li>
        ))}
      </ul>
      <hr />
      <div className="d-flex flex-row justify-content-evenly">{children}</div>
      <hr />
    </>
  );
}

export default ListGroup;
