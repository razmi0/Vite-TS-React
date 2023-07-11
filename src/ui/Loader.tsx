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

const loaderContainer = {
  display: "flex",
  flexFlow: "row nowrap",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem",
};

function Loader({ text = "Loading...", color = "primary" }: LoaderProps) {
  const spinnerColor = `spinner-border m-3 text-${color}`;

  return (
    <div style={loaderContainer}>
      <div className={spinnerColor} role="status"></div>
      <span className="fw-bold">{text}</span>
    </div>
  );
}

export default Loader;
