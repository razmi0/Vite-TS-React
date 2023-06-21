import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import pokemon from "./data.json";
import { handle, ordering } from "./Functions/functions";

function App() {
  const maxListLength = 15;
  const heading = "Pokemon";
  const sortBy = 'type';
  const pokemon_display = pokemon.slice(0, maxListLength).map((item) => {
    return {
      id: item.id,
      name: item.name.french,
      type: item.type,
    };
  });

  return (
    <section className="container">
      <ListGroup
        heading={heading}
        dataFunction={ordering}
        sortBy={sortBy}
        onSelectItem={handle}
        data={pokemon_display}
      >
        <Button color="primary"> App Button </Button>
        <Button color="info"> App Button 2 </Button>
      </ListGroup>
    </section>
  );
}

export default App;
