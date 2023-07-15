import React from "react";

let HStackStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

interface HStackProps {
  children?: React.ReactNode;
  // mode?: ModeType;
  as?: React.ElementType;
  sx?: React.CSSProperties;
}

function HStack({ children, as: Component = "div", sx }: HStackProps) {
  HStackStyle = {
    ...HStackStyle,
    ...sx,
  } as const;
  return <Component style={HStackStyle}>{children}</Component>;
}

export default HStack;
