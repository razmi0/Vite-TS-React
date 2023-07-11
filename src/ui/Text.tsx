import { ReactNode } from "react";

type TextMode = "default" | "highlight";

type TextStylesProps = {
  [key in TextMode]: React.CSSProperties;
};

interface TextProps {
  mode?: TextMode;
  children: ReactNode;
}

const textStyles: TextStylesProps = {
  default: {
    color: "black",
    fontSize: "1em",
    fontWeight: "normal",
    textAlign: "left",
    margin: "0",
    padding: "0",
  },
  highlight: {
    color: "black",
    fontSize: "1em",
    fontWeight: "bold",
    textAlign: "left",
    margin: "0",
    padding: "0",
  },
};

function Text({ mode = "default", children }: TextProps) {
  return (
    <div style={textStyles[mode]}>
      <span>{children}</span>
    </div>
  );
}

export default Text;
