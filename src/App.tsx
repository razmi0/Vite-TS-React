import Table from "./components/Table";
import pokemon from "./data.json";
import { DataTypes, SortsTypes } from "./SharedTypes/types";

function App() {

  const maxListLength = 20;
  const sortsTypes : SortsTypes = ["id", "name", "type"];
  const heading = "Pokemon";
  const pokemon_display : DataTypes = pokemon.slice(0, maxListLength).map((item) => {
    return {
      id: item.id,
      name: item.name.french,
      type: item.type,
    };
  });
  

  return (
    <section className="container">
      <Table heading={heading} data={pokemon_display} sorts={sortsTypes}>
      </Table>
    </section>
  );
}

export default App;
