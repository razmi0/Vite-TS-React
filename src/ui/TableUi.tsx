import React from "react";

interface TableUiProps {
  children: React.ReactNode;
}

const tableStyle = {
  width: "100%",
};

function TableUi({ children }: TableUiProps) {
  return (
    <table className="table-bordered table table-hover" style={tableStyle}>
      {children}
    </table>
  );
}

export default TableUi;
