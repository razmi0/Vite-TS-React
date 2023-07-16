import React from "react";
import styles from "./HStack.module.css";

interface HStackProps {
  children?: React.ReactNode;
  as?: React.ElementType;
  sx?: React.CSSProperties;
}

function HStack({ children, as: Component = "div", sx }: HStackProps) {
  return (
    <Component className={styles.hStack} style={sx}>
      {children}
    </Component>
  );
}

export default HStack;
