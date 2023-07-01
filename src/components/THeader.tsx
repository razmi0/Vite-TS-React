import { ReactNode } from "react";
import { KeyOfDataType } from "../sharedTypes";

interface Props {
  children?: ReactNode;
  color: string;
  sortBy: KeyOfDataType;
  onActive: (sortBy: KeyOfDataType) => void;
  currentAsc: boolean;
  onAsc: (isAsc: boolean) => void;
}

function THeader({ color, sortBy, onActive, currentAsc, onAsc }: Props) {
  if (!sortBy || sortBy === "visible" || sortBy === "id") return <></>;

  return (
    <th
      scope="col"
      className={"my-3 table-" + color}
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

export default THeader;
