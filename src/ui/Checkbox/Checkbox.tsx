import React from "react";
import styles from "./Checkbox.module.css";

const { cbx, lbl, cntr, hiddenXsUp, highlight, jelly, checkedBox } = styles;

interface CheckboxProps {
  id: string | number;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  mode: "default" | "highlight" | "jelly";
  active?: "checked" | "unchecked";
}

function Checkbox({
  id,
  checked = false,
  onChange,
  children,
  mode,
  active,
}: CheckboxProps) {
  const localId = `btn-check-outlined -${id}`;
  let activeStyle = active === "checked" ? checkedBox : "";

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
          <label htmlFor={localId} className={activeStyle + " " + highlight}>
            {children}
          </label>
        </>
      )}
      {mode === "jelly" && (
        <div className={cntr}>
          <input
            type="checkbox"
            className={hiddenXsUp + " " + jelly}
            id={id + " cbx"}
            role="switch"
            autoComplete="off"
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={id + " cbx"} className={cbx}></label>
          <label htmlFor={id + " cbx"} className={highlight + " " + lbl}>
            {children}
          </label>
        </div>
      )}
    </>
  );
}

export default Checkbox;
