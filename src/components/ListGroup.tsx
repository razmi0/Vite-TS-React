import { MouseEvent, ReactNode, useState } from "react";

type DataType = {
  id: number;
  name: string;
  type: string[];
};

interface Props {
  heading: string;
  onSelectItem: (item : any) => void;
  data: Array<DataType>;
  children: ReactNode
}

function ListGroup({ heading, onSelectItem, data }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const setStyle = (selectedIndex : number, index : number) : string => {
    return selectedIndex === index
      ? "list-group-item active"
      : "list-group-item";
  };

  return (
    <div className="container">
      <h1> {heading} </h1>
      <ul className="list-group">
        {data.map((item, index) => (
          <li
            className={ setStyle(selectedIndex, index) }
            key={item.id}
            onClick={ () => {setSelectedIndex(index); onSelectItem(item);}}
          >
            {item.name} | {item.type.join(" ")}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListGroup;
