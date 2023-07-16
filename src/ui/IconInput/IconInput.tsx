import React from "react";
import styles from "./IconInput.module.css";

type TypeProps = "text" | "password" | "email" | "number";

interface IconInputProps {
  url: string;
  sx?: React.CSSProperties;
  type?: TypeProps;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function IconInput({
  url,
  sx,
  type = "text",
  value,
  placeholder,
  onChange,
}: IconInputProps) {
  sx = {
    ...sx,
    backgroundImage: `url(${url})`,
  };
  return (
    <div className="input-group no-outline">
      <span
        className={`input-group-text no-outline ${styles.icon}`}
        style={sx}
      ></span>
      <input
        type={type}
        name={type}
        value={value}
        placeholder={placeholder}
        className={`no-outline form-control ${styles.input}`}
        onChange={(e) => onChange && onChange(e)}
      />
    </div>
  );
}

export default IconInput;
