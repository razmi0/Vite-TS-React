import styles from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
  mode?: "dflt" | "neutral" | "paginationH" | "paginationV";
  sx?: React.CSSProperties;
  as?: React.ElementType;
}

function Container({
  children,
  mode = "dflt",
  as: Component = "div",
  sx,
}: ContainerProps) {
  let cn = styles[mode];
  return (
    <>
      <Component className={cn} style={sx}>
        {children}
      </Component>
    </>
  );
}

export default Container;
