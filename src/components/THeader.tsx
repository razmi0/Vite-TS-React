import { ReactNode } from "react";
import { KeyOfDataType } from '../SharedTypes/types';

interface Props {
  children: ReactNode;
  color: string;
  sortBy: KeyOfDataType;
  onActive: (sortBy : KeyOfDataType) => void;
}

function THeader({ children, color, sortBy, onActive }: Props) {
  if (!sortBy) return <></>;

  const handleClick = () => {
    console.log(`Sorting by ${sortBy}`);
    onActive(sortBy); 
  };

  return (
    <th scope="col" className={"my-3 table-" + color} onClick={handleClick}>
      {children} {sortBy}
    </th>
  );
}

export default THeader;
