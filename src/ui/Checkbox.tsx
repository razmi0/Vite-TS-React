import React from "react";
// import "./css/checkbox.css";

interface CheckboxProps {
  id: string | number;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  mode: "default" | "highlight" | "jelly";
}

type LabelStyle = {
  [key: string]: string | number;
};

const labelStyleHigh: LabelStyle = {
  display: "flex",
  justifyContent: "center",
  borderRadius: 0,
  maxWidth: "100px",
  border: "none",
  borderBottom: "#212121 solid 1px",
  fontSize: "1rem",
  fontWeight: 300,
  margin: "2px",
  padding: "2px 5px",
  cursor: "pointer",
  color: "#212121",
};

const labelStyleJelly: LabelStyle = {
  minWidth: "20px",
  maxWidth: "25px",
  maxHeight: "25px",
};

function Checkbox({ id, checked, onChange, children, mode }: CheckboxProps) {
  const localId = `btn-check-outlined-${id}`;
  return (
    <>
      {mode === "highlight" && (
        <>
          <input
            type="checkbox"
            className="btn-check"
            id={localId}
            autoComplete="off"
            checked={checked}
            onChange={onChange}
          />
          <label
            htmlFor={localId}
            style={labelStyleHigh}
            className="btn btn-outline-success"
          >
            {children}
          </label>
        </>
      )}
      {mode === "jelly" && (
        <div className="cntr">
          <input
            type="checkbox"
            className="hidden-xs-up"
            id={id + " cbx"}
            role="switch"
            autoComplete="off"
            checked={checked}
            onChange={onChange}
            // style={labelStyleJelly}
          />
          <label
            htmlFor={id + " cbx"}
            className="cbx"
            style={labelStyleJelly}
          ></label>
          <label htmlFor={id + " cbx"}>{children}</label>
        </div>
      )}
    </>
  );
}

export default Checkbox;
// style={labelStyle}
