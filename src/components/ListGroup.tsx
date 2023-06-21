import { ReactNode, useState } from "react";
import { DataType, DataTypes, KeyOfDataType } from "../SharedTypes/types";
import Button from "./Button";
import { ordering } from "../Functions/functions";

interface Props {
  heading: string;
  onSelectItem: (item: DataType) => void;
  data: DataTypes;
  sortBy: KeyOfDataType;
  children?: ReactNode;
}

function ListGroup({ heading, onSelectItem, data, sortBy }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [sortedData, setSortedData] = useState<DataTypes>(data);
  

  const setStyle = (selectedIndex: number, index: number): string => {
    return selectedIndex === index
      ? "list-group-item active"
      : "list-group-item";
  };

  return (
    <>
      <h1 className="my-2"> {heading} </h1>
      <ul className="list-group">
        {sortedData.map((item, index) => (
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

      <div className="d-flex flex-row justify-content-evenly">
        <Button color="primary" sortBy='id' data={sortedData} updateData={setSortedData}>
          Sort by
        </Button>
        <Button color="info" sortBy='name' data={sortedData} updateData={setSortedData} >
          Sort by
        </Button>
      </div>

      <hr />
    </>
  );
}

export default ListGroup;
