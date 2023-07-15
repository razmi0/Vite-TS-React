type SectionStyleProps = {
  display: string;
  flexFlow: string;
  padding: string;
  margin: string;
  borderRadius: string;
  border: string;
  maxHeight: string;
  backgroundColor?: string;
};

interface SectionProps {
  children: React.ReactNode;
  mode: "default" | "dark" | "light" | "card" | "filter" | "table";
  sx?: React.CSSProperties;
}
const theme = {
  default: {
    maxWidth: "100%",
    width: "60%",
  },
  card: {
    maxWidth: "800px",
    width: "30%",
    height: "500px",
  },
  filter: {
    maxWidth: "100%",
    width: "100%",
    height: "fit-content",
    minHeight: "fit-content",
    maxHeight: "fit-content",
  },
  table: {
    maxWidth: "100%",
    width: "60%",
    height: "500px",
    // maxHeight: "100%",
    // minHeight: "100%",
  },
};
let sectionStyle: SectionStyleProps = {
  display: "flex",
  flexFlow: "column nowrap",
  padding: "0.5em",
  margin: "0.2em",
  borderRadius: "0px",
  border: "none",
  maxHeight: "100%",
  backgroundColor: "#282828",
};

function Section({ children, mode = "default", sx }: SectionProps) {
  sectionStyle = {
    ...sectionStyle,
    ...theme[mode as keyof typeof theme],
    ...sx,
  } as SectionStyleProps;
  return <section style={sectionStyle}>{children}</section>;
}

export default Section;

// height: "464px",
// minHeight: "444px",
// maxHeight: "444px",
