import { ReactNode } from "react";
import styles from "./Text.module.css";

type TextMode = "dflt" | "pagination";

interface TextProps {
  mode?: TextMode;
  children: ReactNode;
  sx?: React.CSSProperties;
}

function Text({ mode = "dflt", children, sx }: TextProps) {
  let cn = styles.basic;
  if (mode === "dflt") {
    cn = styles.dflt;
  } else if (mode === "pagination") {
    cn = styles.pagination;
  }
  return (
    <div style={sx} className={cn}>
      {children}
    </div>
  );
}

export default Text;
