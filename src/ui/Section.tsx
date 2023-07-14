type SectionStyleProps = {
  display: string;
  flexFlow: string;
  padding: string;
  maxWidth: string;
  margin: string;
  borderRadius: string;
  border: string;
  maxHeight: string;
  backgroundColor?: string;
};

interface SectionProps {
  bgColor?: string;
  children: React.ReactNode;
  bsCol?:
    | "col-1"
    | "col-2"
    | "col-3"
    | "col-4"
    | "col-5"
    | "col-6"
    | "col-7"
    | "col-8"
    | "col-9"
    | "col-10"
    | "col-11"
    | "col-12";
}

let sectionStyle: SectionStyleProps = {
  display: "flex",
  flexFlow: "column nowrap",
  padding: "0.5em",
  maxWidth: "fit-content",
  margin: "0.5em",
  borderRadius: "5px",
  border: "none",
  maxHeight: "fit-content",
};

function Section({ bgColor, children, bsCol }: SectionProps) {
  sectionStyle = {
    ...sectionStyle,
    backgroundColor: bgColor,
    maxWidth: "100%",
  };
  return (
    <section style={sectionStyle} className={bsCol}>
      {children}
    </section>
  );
}

export default Section;
