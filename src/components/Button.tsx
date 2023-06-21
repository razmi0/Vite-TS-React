import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color: string;
}

type OptionalProps = Partial<Props>;

function Button({ children, color }: OptionalProps) {
  return <button className={"my-3 btn btn-outline-" + color}>{children}</button>;
}

export default Button;
