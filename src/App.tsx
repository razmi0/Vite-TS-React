import { ReactNode } from "react";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import pokemon from "./data.json";


function App() {
  const pokemon_display = pokemon.slice(0, 10).map((item) => {
    return {
      id: item.id,
      name: item.name.french,
      type: item.type,
    };
  });  

  const handle = (item : any) => {
    console.log(item.name)
  };

  const heading = "Pokemon"

  return (
    <section>
      <ListGroup heading={ heading } onSelectItem = { handle } data={ pokemon_display }>
        <Button> App Button </Button>
        </ListGroup>
    </section>
  );
}

export default App;
