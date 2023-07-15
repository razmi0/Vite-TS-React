import React from "react";

type TypeProps = "text" | "password" | "email" | "number";

interface IconInputProps {
  url: string;
  type?: TypeProps;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputProps {
  textAlign?: "start" | "center" | "end";
  paddingLeft?: string;
  maxWidth?: string;
}

type IconInputStyleProps = {
  [key: string]: string;
};

let iconInputStyle: IconInputStyleProps = {
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  objectFit: "scale-down",
  padding: "12px",
};

let inputStyle: InputProps = {
  textAlign: "start",
  paddingLeft: "10px",
  maxWidth: "100%",
};

function IconInput({
  url,
  type = "text",
  value,
  placeholder,
  onChange,
}: IconInputProps) {
  iconInputStyle = {
    ...iconInputStyle,
    backgroundImage: `url(${url})`,
  };
  return (
    <div className="input-group no-outline">
      <span
        className="input-group-text no-outline"
        style={iconInputStyle}
      ></span>
      <input
        type={type}
        name={type}
        value={value}
        placeholder={placeholder}
        className="no-outline form-control"
        style={inputStyle}
        onChange={(e) => onChange && onChange(e)}
      />
    </div>
  );
}

export default IconInput;
