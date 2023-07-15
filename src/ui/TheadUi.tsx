import React from "react";

interface Props {
  onClick: () => void;
  children?: React.ReactNode;
}

const theadStyle = {
  cursor: "pointer",
  borderBottom: "1px solid ",
  borderColor: "#e0e0e0",
};

function TheadUi({ onClick, children }: any) {
  return (
    <th style={theadStyle} onClick={onClick}>
      {children}
    </th>
  );
}

export default TheadUi;
