import { DataType } from "../SharedTypes";

interface Props {
  item: DataType;
  index: number;
  handleClick: (index: number, item: DataType) => void;
  selectedIndex: number;
  setStyle: (selectedIndex: number, index: number) => string;
}

function TBody({ item, index, handleClick, selectedIndex, setStyle }: Props) {
  // index.visible === true ? display : no display
  //
  if (!item.visible) {
    return <></>;
  }
  return (
    <tr
      className={setStyle(selectedIndex, index)}
      key={item.id}
      onClick={() => {
        handleClick(index, item);
      }}
    >
      {/* <td>{item.id}</td> */}
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
