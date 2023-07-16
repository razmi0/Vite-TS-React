import styles from "./IconButton.module.css";

interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
  mode?: string;
}

let iconCssProp: React.CSSProperties = {};
function IconButton({
  children,
  icon,
  onClick,
  sx,
  mode = "dflt",
}: IconButtonProps) {
  iconCssProp = {
    ...sx,
    backgroundImage: `url(${icon})`,
  };
  let cn = styles[mode];
  mode !== "dflt" ? (cn = styles[mode]) : (cn = styles.dflt);
  return (
    <button className={cn} style={iconCssProp} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
