import React from "react";

type HStackStyle = {
  display: "flex";
  flexFlow: "row wrap";
  justifyContent: "flex-start";
  alignItems: "flex-start";
  marginBottom: "1em";
  mode?:
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "start"
    | "end"
    | "center"
    | "stretch";
};

let HStackStyle = {
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  marginBottom: "1em",
  mode: "around",
};

interface Props {
  children?: React.ReactNode;
  mode?:
    | "space-around"
    | "space-between"
    | "space-evenly"
    | "start"
    | "end"
    | "center"
    | "stretch";
}

function HStack({ children }: Props) {
  // HStackStyle.justifyContent = mode;
  return <div style={HStackStyle}>{children}</div>;
}

export default HStack;
