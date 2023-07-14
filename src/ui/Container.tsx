interface ContainerProps {
  children: React.ReactNode;
  mode?: "default" | "neutral";
  /**
   * @default div
   * @example as="div"
   */
  as?: React.ElementType;
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
function Container({
  children,
  mode = "default",
  as: Component = "div",
}: ContainerProps) {
  return (
    <>
      <Component style={containerStyle[mode]}>{children}</Component>
    </>
  );
}

export default Container;
