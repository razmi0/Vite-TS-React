import Table from "./components/Table";
import Range from "./components/Range";
import pokemon from "./data.json";
import { useState } from "react";
import { DataTypes, SortsTypes, KeyOfDataType } from "./SharedTypes/types";
import "./App.css";

const colors = [
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "secondary",
  "primary",
];

const poksLength = pokemon.length;

function App() {
  const [userPoksLength, setUserPoksLength] = useState(10);

  const isAsc = true;

  const pokemon_display: DataTypes = pokemon
    .slice(0, userPoksLength)
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

  return (
    <section className="container-sm">
      <h1 className="mt-5 d-block"> Pokemon Table </h1>
      <Range
        userPoksLength={userPoksLength}
        setUserPoksLength={setUserPoksLength}
        poksLength={poksLength}
      />
      {pokemon_display.length > 0 && (
        <Table
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
