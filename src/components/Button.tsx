import { ReactNode } from "react";
import { KeyOfDataType } from '../SharedTypes/types';

interface Props {
  children: ReactNode;
  color: string;
  sortBy: KeyOfDataType;
  onActive: (sortBy : KeyOfDataType) => void;
}

function Button({ children, color, sortBy, onActive }: Props) {
  if (!sortBy) return <></>;

  const handleClick = () => {
    console.log(`Button ${sortBy} clicked`);
    onActive(sortBy); 
  };

  return (
    <button className={"my-3 btn btn-outline-" + color} onClick={handleClick}>
      {children} {sortBy}
    </button>
  );
}

export default Button;
