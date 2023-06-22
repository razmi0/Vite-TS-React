import Table from "./components/Table";
import pokemon from "./data.json";
import { DataTypes, SortsTypes } from "./SharedTypes/types";
import "./App.css";

function App() {

  

  const maxListLength = 20;
  const sortsTypes : SortsTypes = ["id", "name", "type"];
  const colors = ["success", "danger", "warning", "info", "light", "dark"];
  const title = "Pokemon";
  const pokemon_display : DataTypes = pokemon.slice(0, maxListLength).map((item) => {
    return {
      id: item.id,
      name: item.name.french,
      type: item.type,
    };
  });
  

  return (
    <section className="container-sm">
      <Table heading={title} data={pokemon_display} sorts={sortsTypes} colors={colors}>
      </Table>
    </section>
  );
}

export default App;
