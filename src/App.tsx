import ListGroup from "./components/ListGroup";
import pokemon from "./data.json";
import { SortsTypes } from "./SharedTypes/types";

function App() {

  const maxListLength = 20;
  const sortsTypes : SortsTypes = ["id", "name", "type"];
  const heading = "Pokemon";
  const pokemon_display = pokemon.slice(0, maxListLength).map((item) => {
    return {
      id: item.id,
      name: item.name.french,
      type: item.type,
    };
  });
  

  return (
    <section className="container">
      <ListGroup heading={heading} data={pokemon_display} sorts={sortsTypes}>
      </ListGroup>
    </section>
  );
}

export default App;
