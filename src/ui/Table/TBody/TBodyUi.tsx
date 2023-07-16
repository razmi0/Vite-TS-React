import React from "react";
import styles from "./TbodyUi.module.css";

console.log(styles);

interface TBodyUiProps {
  children: React.ReactNode;
}

function TBodyUi({ children }: TBodyUiProps) {
  return <tbody className={styles.tbody}>{children}</tbody>;
}

export default TBodyUi;
