interface HeadingProps {
  text: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

function Heading({ text, as: Component = "h1" }: HeadingProps) {
  return (
    <div className=" mt-3 mb-3 d-flex justify-content-center">
      <Component className="text-center">{text}</Component>
    </div>
  );
}

export default Heading;
