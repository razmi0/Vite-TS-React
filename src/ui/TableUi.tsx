import React from "react";

interface TableUiProps {
  children: React.ReactNode;
}

const tableStyle = {
  width: "100%",
  // border: "1px solid black",
};

function TableUi({ children }: TableUiProps) {
  return <table style={tableStyle}>{children}</table>;
}

export default TableUi;
