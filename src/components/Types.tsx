import { Fams } from "../sharedTypes";

interface TypesProps {
  data: Fams[];
  checked: boolean[];
  handleToggle: (index: number) => void;
}

function Types({ data, checked, handleToggle }: TypesProps) {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            className="btn-check"
            id={`btn-check-outlined-${index}`}
            autoComplete="off"
            checked={checked[index]}
            onChange={() => {
              handleToggle(index);
            }}
          />
          <label
            className="btn btn-outline-success btn-types"
            htmlFor={`btn-check-outlined-${index}`}
          >
            {item}
          </label>
        </div>
      ))}
    </>
  );
}

export default Types;
