import ListGroup from "./components/ListGroup";
import pokemon from "./data.json";

function App() {
  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div>
      <ListGroup handle={ handleClick } arr_items={ pokemon } />
    </div>
  );
}

export default App;
