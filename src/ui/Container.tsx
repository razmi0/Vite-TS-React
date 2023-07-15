interface ContainerProps {
  children: React.ReactNode;
  mode?: "default" | "neutral" | "pagination";
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
  pagination: {
    // padding: "0.5em",
    position: "relative",
    // margin: "0.2em",
    top: "10em",
    right: "1.3em",
    zIndex: 1,
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
