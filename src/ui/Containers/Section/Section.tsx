import styles from "./Section.module.css";

const { dflt, card, filter } = styles;

interface SectionProps {
  children: React.ReactNode;
  mode?: "card" | "filter" | "dflt" | "table";
  sx?: React.CSSProperties;
}

let cn: string = dflt;
function Section({ children, mode, sx }: SectionProps) {
  if (mode) {
    cn = `${dflt} ${styles[mode]}`;
  }
  return (
    <section style={sx} className={cn}>
      {children}
    </section>
  );
}

export default Section;
