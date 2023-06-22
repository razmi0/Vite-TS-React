import { DataType } from "../SharedTypes/types";

interface Props {
  item: DataType;
  index: number;
  handleClick: (index: number, item: DataType) => void;
  selectedIndex: number;
  setStyle: (selectedIndex: number, index: number) => string;
}

function TBody({ item, index, handleClick, selectedIndex, setStyle }: Props) {
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

      <td>{item.HP}</td>
      <td>{item.Attack}</td>
      <td>{item.Defense}</td>
      <td>{item.SpAttack}</td>
      <td>{item.SpDefense}</td>
      <td>{item.Speed}</td>
    </tr>
  );
}

export default TBody;
