import { ReactNode } from "react";
import IconButton from "./IconButton";

type ModeType = "header" | "VPage" | "HPage";
let globalMode: ModeType = "header";

interface NavProps {
  children?: ReactNode;
}

const navStyle: React.CSSProperties = {
  height: "100%",
  marginLeft: "1rem",
  backgroundColor: "#282828",
};

function Nav({ children }: NavProps) {
  return (
    <nav aria-label="Page navigation table " style={navStyle}>
      {children}
    </nav>
  );
}

const listStyleV = {
  flexDirection: "column",
} as const;

const listStyleH = {
  flexDirection: "row",
} as const;

let listbasicStyle = {
  display: "flex",
  width: "fit-content",
  alignItems: "center",
  justifyContent: "center",
  flexWrap: "wrap",
};

function List({ mode, children }: { mode: ModeType; children: ReactNode }) {
  globalMode = mode;
  if (mode === "VPage") {
    listbasicStyle = { ...listbasicStyle, ...listStyleV };
  } else if (mode === "HPage") {
    listbasicStyle = { ...listbasicStyle, ...listStyleH };
  }
  return (
    <ul className="pagination" style={listbasicStyle as React.CSSProperties}>
      {children}
    </ul>
  );
}
const listItemStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
function ListItem({ children }: { children: ReactNode }) {
  return <li style={listItemStyle}>{children}</li>;
}

interface ButtonListProps {
  children?: ReactNode;
  onClick?: () => void;
  activeValue?: boolean;
  /**
   * Give url of icon
   */
  icon?: string;
  sx?: React.CSSProperties;
}

const activeStyleH = {
  color: "#535bf2",
  fontSize: "0.9rem",
  fontWeight: "bold",
  borderBottom: "1px solid #535bf2",
  paddingTop: "1px",
};
const activeStyleV = {
  color: "#535bf2",
  fontSize: "0.9rem",
  fontWeight: "bold",
};

function ButtonList({
  children,
  onClick,
  activeValue = false,
  icon,
}: ButtonListProps) {
  let btnIconStyle = {
    minHeight: "0.7rem",
    maxHeight: "0.7rem",
    minWidth: "0.7rem",
    maxWidth: "0.7rem",
    height: "0.7rem",
    width: "0.7rem",
  };
  let btnItemStyle = {
    fontWeight: "normal",
    fontSize: "0.8rem",
    color: "#535353",
    minWidth: "1.5rem",
    border: "none",
    backgroundColor: "inherit",
    borderBottom: "none",
    marginLeft: "0.2rem",
    marginRight: "0.2rem",
  };
  if (globalMode === "VPage") {
    activeValue
      ? (btnItemStyle = { ...btnItemStyle, ...activeStyleV })
      : (btnItemStyle = { ...btnItemStyle });
  }
  if (globalMode === "HPage") {
    activeValue
      ? (btnItemStyle = { ...btnItemStyle, ...activeStyleH })
      : (btnItemStyle = { ...btnItemStyle });
  }

  return (
    <>
      {!icon && (
        <button type="button" style={btnItemStyle} onClick={onClick}>
          {children}
        </button>
      )}
      {icon && (
        <IconButton icon={icon} onClick={onClick} sx={btnIconStyle}>
          {children}
        </IconButton>
      )}
    </>
  );
}

export { Nav, List, ListItem, ButtonList };
