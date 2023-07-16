import React from "react";

import styles from "./TdUi.module.css";
console.log(styles);

interface TdUiProps {
  children: React.ReactNode;
}

function TdUi({ children }: TdUiProps) {
  return (
    <td className={styles.td}>
      <div className={styles.tdDiv}>{children}</div>
    </td>
  );
}

export default TdUi;
