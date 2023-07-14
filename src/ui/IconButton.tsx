//TODO: Add icon button component

interface IconButtonProps {
  icon: string;
  onClick?: () => void;
  children?: React.ReactNode;
  sx?: React.CSSProperties;
}
type IconInputStyleProps = {
  [key: string]: string;
};

let iconInputStyle: IconInputStyleProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  border: "none",
  backgroundColor: "inherit",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  objectFit: "scale-down",
  margin: "2px",
  padding: "2px",
};
function IconButton({ children, icon, onClick, sx }: IconButtonProps) {
  iconInputStyle = {
    ...iconInputStyle,
    backgroundImage: `url(${icon})`,
  };
  if (sx) {
    iconInputStyle = {
      ...iconInputStyle,
      ...(sx as IconInputStyleProps),
    };
  }
  return (
    <button style={iconInputStyle} onClick={onClick}>
      {children}
    </button>
  );
}

export default IconButton;
