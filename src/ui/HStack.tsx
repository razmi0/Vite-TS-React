import React from "react";

// type ModeType =
//   | "space-around"
//   | "space-between"
//   | "space-evenly"
//   | "start"
//   | "end"
//   | "center"
//   | "stretch";

interface HStackStyleType {
  display: "flex";
  flexFlow: "row wrap";
  justifyContent: "flex-start";
  alignItems: "flex-start";
  marginBottom: "1em";
  // mode?: ModeType;
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
}

let HStackStyle: HStackStyleType = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginBottom: "1em",
  // mode: "around",
};

interface HStackProps {
  children?: React.ReactNode;
  // mode?: ModeType;
  as?: React.ElementType;
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
}

function HStack({
  children,
  as: Component = "div",
  wrap = "wrap",
}: HStackProps) {
  // HStackStyle.justifyContent = mode;
  HStackStyle = {
    ...HStackStyle,
    flexWrap: wrap as "wrap" | "nowrap" | "wrap-reverse",
  };
  return <Component style={HStackStyle}>{children}</Component>;
}

export default HStack;
