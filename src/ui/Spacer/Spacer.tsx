import styles from "./Spacer.module.css";

function Spacer({ sx }: { sx?: React.CSSProperties }) {
  return <div style={sx} className={styles.spacer}></div>;
}

export default Spacer;
