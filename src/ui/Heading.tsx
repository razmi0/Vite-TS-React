interface HeadingProps {
  text: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const headingStyle = {
  backgroundColor: "#282828",
  color: "#fe7f2d",
};

function Heading({ text, as: Component = "h1" }: HeadingProps) {
  return (
    <div
      style={headingStyle}
      className={`${
        Component === "h1" ? "mt-1" : "mt-3"
      } d-flex justify-content-start aligh-item-center mx-1`}
    >
      <Component className="m-0 p-2">{text}</Component>
    </div>
  );
}

export default Heading;
