const VStackStyles = {
  display: "flex",
  flexFlow: "column nowrap",
  paddingRight: "0.5em",
  paddingLeft: "0.5em",
};

interface VStackProps {
  children: React.ReactNode;
}

function VStack({ children }: VStackProps) {
  return <div style={VStackStyles}>{children}</div>;
}

export default VStack;
