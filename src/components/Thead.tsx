import { ReactNode } from "react";
import { KeyOfDataType } from "../types";
import { TheadUi } from "../ui";

interface Props {
  children?: ReactNode;
  color?: string;
  sortBy: KeyOfDataType;
  onActive: (sortBy: KeyOfDataType) => void;
  currentAsc: boolean;
  onAsc: (isAsc: boolean) => void;
}
function Thead({ color, sortBy, onActive, currentAsc, onAsc }: Props) {
  if (!sortBy || sortBy === "visible" || sortBy === "id") return <></>;

  return (
    <TheadUi
      onClick={() => {
        onActive(sortBy);
        onAsc(!currentAsc);
      }}
    >
      {sortBy.charAt(0).toLocaleUpperCase() + sortBy.slice(1, sortBy.length)}{" "}
      {currentAsc ? "▲" : "▼"}
    </TheadUi>
  );
}

export default Thead;
