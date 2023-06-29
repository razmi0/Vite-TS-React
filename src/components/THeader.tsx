import { ReactNode } from "react";
import { KeyOfDataType } from "../SharedTypes/types";

interface Props {
  children?: ReactNode;
  color: string;
  sortBy: KeyOfDataType;
  onActive: (sortBy: KeyOfDataType) => void;
  currentAsc: boolean;
  onAsc: (isAsc: boolean) => void;
}

function THeader({ color, sortBy, onActive, currentAsc, onAsc }: Props) {
  if (!sortBy) return <></>;

  return (
    <th
      scope="col"
      className={"my-3 table-" + color}
      onClick={() => {
        onActive(sortBy);
        onAsc(!currentAsc);
      }}
    >
      {sortBy} {currentAsc ? "▲" : "▼"}
    </th>
  );
}

export default THeader;
