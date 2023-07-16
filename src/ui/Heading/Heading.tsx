import styles from "./Heading.module.css";

interface HeadingProps {
  text: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  sx?: React.CSSProperties;
}

function Heading({ text, as: Component = "h1", sx }: HeadingProps) {
  return (
    <div
      style={sx}
      className={`${styles.heading} ${Component === "h1" ? styles.wFull : ""}`}
    >
      <Component className={styles.text}>{text}</Component>
    </div>
  );
}

export default Heading;
