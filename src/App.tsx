import Table from "./components/Table";
import pokemon from "./data.json";
import { DataTypes, SortsTypes, KeyOfDataType } from "./SharedTypes/types";
import "./App.css";

function App() {
  const maxListLength = 10;
  const pokemon_display: DataTypes = pokemon
    .slice(0, maxListLength)
    .map((item) => {
      return {
        id: item.id,
        name: item.name.french,
        type: item.type,
        Attack: item.base["Attack"],
        Defense: item.base["Defense"],
        Speed: item.base["Speed"],
        SpAttack: item.base["Sp. Attack"],
        SpDefense: item.base["Sp. Defense"],
        HP: item.base["HP"],
      };
    });

  const sortsTypes: SortsTypes = Object.keys(
    pokemon_display[0]
  ) as KeyOfDataType[];

  console.log(sortsTypes);

  const colors = [
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "secondary",
    "primary",
  ];
  const title = "Pokemon";

  const isAsc = true;

  console.log(pokemon_display[0]);

  return (
    <section className="container-sm">
      {pokemon_display.length > 0 && (
        <Table
          heading={title}
          data={pokemon_display}
          sorts={sortsTypes}
          colors={colors}
          isAsc={isAsc}
        />
      )}
    </section>
  );
}

export default App;
