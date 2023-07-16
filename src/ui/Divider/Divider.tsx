import styles from "./Divider.module.css";

function Divider({ sx }: { sx?: React.CSSProperties }) {
  return <hr style={sx} className={styles.hr} />;
}

export default Divider;
