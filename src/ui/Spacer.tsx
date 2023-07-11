interface SpacerProps {}

const spacerStyle = {
  flexGrow: 1,
};

function Spacer({}: SpacerProps) {
  return <div style={spacerStyle}></div>;
}

export default Spacer;
