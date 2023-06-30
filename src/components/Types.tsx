interface TypesProps {
  data: string[];
  checked: boolean[];
  handleToggle: (index: number) => void;
}

function Types({ data, checked, handleToggle }: TypesProps) {
  return (
    <>
      {data.map((item, index) => (
        <>
          <input
            type="checkbox"
            className="btn-check"
            id={`btn-check-outlined-${index}`}
            autoComplete="off"
            checked={checked[index]}
            key={index}
            onChange={() => {
              handleToggle(index);
            }}
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
