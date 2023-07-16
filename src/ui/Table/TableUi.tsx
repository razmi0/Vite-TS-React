import React from "react";
import styles from "./TableUi.module.css";

const { table } = styles;

interface TableUiProps {
  children: React.ReactNode;
}

function TableUi({ children }: TableUiProps) {
  return <table className={table}>{children}</table>;
}

export default TableUi;
