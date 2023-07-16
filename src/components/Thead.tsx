import { ReactNode } from "react";
import { KeyOfDataType } from "../types";
import { THeadUi, ThUi } from "../ui";

interface Props {
  children?: ReactNode;
  color?: string;
  sortBy: KeyOfDataType;
  onActive: (sortBy: KeyOfDataType) => void;
  currentAsc: boolean;
  onAsc: (isAsc: boolean) => void;
  isSelectedTh: (selectedIndex: number, index: number) => boolean;
  handleClick: (index: number) => void;
  selectedTh: number;
  index: number;
}
function Thead({
  color,
  sortBy,
  onActive,
  currentAsc,
  onAsc,
  isSelectedTh,
  handleClick,
  selectedTh,
  index,
}: Props) {
  if (!sortBy || sortBy === "visible" || sortBy === "id") return <></>;

  return (
    <ThUi
      onClick={() => {
        onActive(sortBy);
        onAsc(!currentAsc);
        handleClick(index);
      }}
      active={isSelectedTh(selectedTh, index)}
    >
      {sortBy.charAt(0).toLocaleUpperCase() + sortBy.slice(1, sortBy.length)}{" "}
      {currentAsc ? "▲" : "▼"}
    </ThUi>
  );
}

export default Thead;
