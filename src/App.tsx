import ListGroup from "./components/ListGroup";
import pokemon from "./data.json";
import { handle } from "./Functions/functions";

function App() {
  const maxListLength = 15;
  const heading = "Pokemon";
  const sortByName = "name";
  const sortById = "id";
  const sortByType = "type";
  const pokemon_display = pokemon.slice(0, maxListLength).map((item) => {
    return {
      id: item.id,
      name: item.name.french,
      type: item.type,
    };
  });
  

  return (
    <section className="container">
      <ListGroup heading={heading} onSelectItem={handle} data={pokemon_display} sortBy={sortByName}>
      </ListGroup>
    </section>
  );
}

export default App;
