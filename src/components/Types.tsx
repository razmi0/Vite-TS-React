import React from "react";

interface TypesProps {
  data: {
    name: string;
    type: string[];
  }[];
}

function Types({ data }: TypesProps) {
  const allTypes = data.map((item) => item.type).flat();
  const uniqueTypes = [...new Set(allTypes)];

  return (
    <>
      {uniqueTypes.map((item, index) => (
        <>
          <input
            type="checkbox"
            className="btn-check"
            id={`btn-check-outlined-${index}`}
            autoComplete="off"
            key={index}
          />
          <label
            className="btn btn-outline-success btn-types"
            htmlFor={`btn-check-outlined-${index}`}
            key={index + 1}
          >
            {item}
          </label>
        </>
      ))}
    </>
  );
}

export default Types;
