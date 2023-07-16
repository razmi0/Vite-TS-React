import { ReactNode } from "react";
import IconButton from "../IconButton/IconButton";
import styles from "./Nav.module.css";

type ModeType = "header" | "VPage" | "HPage";
let globalMode: ModeType = "header";

function Nav({ children }: { children: ReactNode }) {
  return (
    <nav aria-label="Page navigation table " className={styles.nav}>
      {children}
    </nav>
  );
}

function List({ mode, children }: { mode: ModeType; children: ReactNode }) {
  let cn = styles.ul;
  globalMode = mode;
  mode === "VPage"
    ? (cn = `${cn} ${styles.vStack}`)
    : (cn = `${cn} ${styles.hStack}`);
  return <ul className={`pagination ${cn}`}>{children}</ul>;
}

function ListItem({ children }: { children: ReactNode }) {
  return <li className={styles.li}>{children}</li>;
}

interface ButtonListProps {
  children?: ReactNode;
  onClick?: () => void;
  activeValue?: boolean;
  icon?: string;
  sx?: React.CSSProperties;
}

function ButtonList({
  children,
  onClick,
  activeValue = false,
  icon,
}: ButtonListProps) {
  let cn = styles.btnItem;
  globalMode === "HPage" && activeValue
    ? (cn = `${cn} ${styles.activeH}`)
    : (cn = `${cn} ${styles.activeV}`);
  return (
    <>
      {!icon && (
        <button type="button" className={cn} onClick={onClick}>
          {children}
        </button>
      )}
      {icon && (
        <IconButton icon={icon} onClick={onClick}>
          {children}
        </IconButton>
      )}
    </>
  );
}

export { Nav, List, ListItem, ButtonList };
