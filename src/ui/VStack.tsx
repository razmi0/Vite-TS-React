const VStackStyles = {
  display: "flex",
  flexFlow: "column nowrap",
  paddingRight: "0.5em",
  paddingLeft: "0.5em",
};

interface VStackProps {
  children: React.ReactNode;
  /**
   * @default div
   * @example as="div"
   */
  as?: React.ElementType;
}

function VStack({ children, as: Component = "div" }: VStackProps) {
  return <Component style={VStackStyles}>{children}</Component>;
}

export default VStack;
