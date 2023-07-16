import { DataType } from "../types";
import { TdUi, TrUi } from "../ui";
interface Props {
  item: DataType;
  index: number;
  handleClick: (index: number, item: DataType) => void;
  selectedIndex: number;
  isSelectedRow: (selectedIndex: number, index: number) => boolean;
}

function Tbody({
  item,
  index,
  handleClick,
  selectedIndex,
  isSelectedRow,
}: Props) {
  if (!item.visible) {
    return <></>;
  }

  return (
    <TrUi
      active={isSelectedRow(selectedIndex, index)}
      key={item.id}
      onClick={() => {
        handleClick(index, item);
      }}
    >
      <TdUi>{item.name}</TdUi>
      <TdUi>{item.type.join(" ")}</TdUi>
      <TdUi>{item.Attack}</TdUi>
      <TdUi>{item.Defense}</TdUi>
      <TdUi>{item.Speed}</TdUi>
      <TdUi>{item.SpAttack}</TdUi>
      <TdUi>{item.SpDefense}</TdUi>
      <TdUi>{item.HP}</TdUi>
    </TrUi>
  );

  // index in trueIndex
}

export default Tbody;
