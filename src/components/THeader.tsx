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

function THeader({
  children,
  color,
  sortBy,
  onActive,
  currentAsc,
  onAsc,
}: Props) {
  if (!sortBy) return <></>;

  const handleClickSortType = () => {
    onActive(sortBy);
  };

  const handleClickSortAsc = () => {
    const asc_str = currentAsc ? "ASC" : "DSC";
    onAsc(!currentAsc);
  };

  return (
    <th
      scope="col"
      className={"my-3 table-" + color}
      onClick={() => {
        handleClickSortType();
        handleClickSortAsc();
      }}
    >
      {sortBy} {currentAsc ? "▲" : "▼"}
    </th>
  );
}

export default THeader;
