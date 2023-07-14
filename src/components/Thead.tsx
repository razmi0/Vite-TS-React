import { ReactNode } from "react";
import { KeyOfDataType } from "../types";

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
    <th
      // scope="col"
      // className={}
      onClick={() => {
        onActive(sortBy);
        onAsc(!currentAsc);
      }}
    >
      {sortBy.charAt(0).toLocaleUpperCase() + sortBy.slice(1, sortBy.length)}{" "}
      {currentAsc ? "▲" : "▼"}
    </th>
  );
}

export default Thead;
