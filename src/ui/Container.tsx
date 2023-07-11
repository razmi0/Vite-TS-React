interface ContainerProps {
  children: React.ReactNode;
  mode?: "default" | "neutral";
}
const containerStyle = {
  default: {
    margin: "0.2em",
    padding: "0.2em",
  },
  neutral: {
    margin: "0",
    padding: "0",
  },
};
/**
 * Add .2em margin and padding to the children
 */
function Container({ children, mode = "default" }: ContainerProps) {
  return (
    <>
      <div style={containerStyle[mode]}>{children}</div>
    </>
  );
}

export default Container;
