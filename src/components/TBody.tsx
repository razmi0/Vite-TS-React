import { DataType } from "../SharedTypes/types";

interface Props {
  item: DataType;
  index: number;
  handleClick: (index: number, item: DataType) => void;
  selectedIndex: number;
  setStyle: (selectedIndex: number, index: number) => string;
  checkTypes: boolean[];
}

function TBody({
  item,
  index,
  handleClick,
  selectedIndex,
  setStyle,
  checkTypes,
}: Props) {
  // all false => display all

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
      <td>{item.Attack}</td>
      <td>{item.Defense}</td>
      <td>{item.Speed}</td>
      <td>{item.SpAttack}</td>
      <td>{item.SpDefense}</td>
      <td>{item.HP}</td>
    </tr>
  );

  // index in trueIndex
}

export default TBody;
