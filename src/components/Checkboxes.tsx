import { Fams } from "../types";

interface CheckboxesProps {
  data: Fams[];
  checked: boolean[];
  handleToggle: (index: number) => void;
}

function Checkboxes({ data, checked, handleToggle }: CheckboxesProps) {
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

export default Checkboxes;
