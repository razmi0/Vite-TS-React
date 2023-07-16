import React from "react";
import styles from "./TrUi.module.css";

interface TrUiProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

function TrUi({ children, active, onClick }: TrUiProps) {
  let activeStyle = styles.dflt;
  if (active) {
    activeStyle = styles.active;
  }

  return (
    <tr className={styles.tr + " " + activeStyle} onClick={onClick}>
      {children}
    </tr>
  );
}

export default TrUi;
