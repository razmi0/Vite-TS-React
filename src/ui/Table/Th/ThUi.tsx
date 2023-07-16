import React from "react";
import styles from "./ThUi.module.css";

interface ThUiProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
}

function ThUi({ children, onClick, active }: ThUiProps) {
  let activeStyle = active ? styles.active : "";
  return (
    <th className={styles.dflt + " " + activeStyle} onClick={onClick}>
      {children}
    </th>
  );
}

export default ThUi;
