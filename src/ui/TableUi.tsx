import React from "react";

interface TableUiProps {
  children: React.ReactNode;
}

const tableStyle = {
  width: "100%",
};

function TableUi({ children }: TableUiProps) {
  return <table style={tableStyle}>{children}</table>;
}

export default TableUi;
