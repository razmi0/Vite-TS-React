import React from "react";
import styles from "./THeadUi.module.css";

interface TheadUiProps {
  children: React.ReactNode;
  onClick?: () => void;
}

function THeadUi({ children, onClick }: TheadUiProps) {
  return (
    <thead onClick={onClick} className={styles.thead}>
      {children}
    </thead>
  );
}

export default THeadUi;
