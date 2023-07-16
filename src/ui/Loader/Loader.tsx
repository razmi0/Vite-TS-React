import styles from "./Loader.module.css";
interface LoaderProps {
  text?: string;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "light"
    | "dark";
}

function Loader({ text = "Loading...", color = "primary" }: LoaderProps) {
  const spinnerColor = `spinner-border m-3 text-${color}`;

  return (
    <div className={styles.loader}>
      <div className={spinnerColor} role="status"></div>
      <span className="fw-bold">{text}</span>
    </div>
  );
}

export default Loader;
