import { ReactNode } from "react";

type TextMode = "default" | "highlight" | "pagination";

type TextStylesProps = {
  [key in TextMode]: React.CSSProperties;
};

interface TextProps {
  mode?: TextMode;
  children: ReactNode;
}
let basicStyle = {
  border: "none",
  backgroundColor: "inherit",
  // textAlign: "center",
} as React.CSSProperties;

const textStyles: TextStylesProps = {
  default: {
    color: "inherit",
    fontSize: "1em",
    fontWeight: "normal",
    textAlign: "left",
    margin: "0",
    padding: "0",
  },
  highlight: {
    color: "inherit",
    fontSize: "1em",
    fontWeight: "bold",
    textAlign: "left",
    margin: "0",
    padding: "0",
  },
  pagination: {
    fontSize: "0.8em",
    color: "#535bf2",
    fontWeight: "bold",
    textAlign: "center",
  },
};

function Text({ mode = "default", children }: TextProps) {
  basicStyle = {
    ...basicStyle,
    ...textStyles[mode],
  };
  return <div style={basicStyle}>{children}</div>;
}

export default Text;
