import styles from "./VStack.module.css";

interface VStackProps {
  children: React.ReactNode;
  as?: React.ElementType;
  sx?: React.CSSProperties;
}

function VStack({ children, sx, as: Component = "div" }: VStackProps) {
  return (
    <Component className={styles.vStack} style={sx}>
      {children}
    </Component>
  );
}

export default VStack;
