import { ReactNode, useState } from "react";
import { KeyOfDataType, DataTypes } from "../SharedTypes/types";
import { ordering } from "../Functions/functions";

interface Props {
  children: ReactNode;
  color: string;
  //   setSort: (items: DataTypes, sortBy: KeyOfDataType) => DataTypes;
  sortBy: KeyOfDataType;
  data: DataTypes;
  updateData: (items: DataTypes) => void;
}

type OptionalProps = Partial<Props>;

function Button({ children, color, sortBy, data, updateData }: OptionalProps) {
  return (
    <button
      className={"my-3 btn btn-outline-" + color}
      onClick={() => {
        const sortedData = ordering(data, sortBy);
        updateData(sortedData);
        console.log(sortedData);
        
      }}
    >
      {children} {sortBy}
    </button>
  );
}

export default Button;
