import { Table, Range, Types } from "./components/index";
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

  const pokemon_types = pokemon_display.slice(0, userPoksLength).map((item) => {
    return {
      name: item.name,
      type: item.type,
    };
  });

  const sortsTypes: SortsTypes = Object.keys(
    pokemon_display[0]
  ) as KeyOfDataType[];

  return (
    <>
      <h1 className="mt-5 mb-5 text-center"> Pokemon Table </h1>
      <div className="row px-5">
        <div className=" row flex-grow-1">
          <div /* FILTERS */ className="col-3">
            <Range
              userPoksLength={userPoksLength}
              setUserPoksLength={setUserPoksLength}
              poksLength={poksLength}
            />
          </div>
          <div className="col-5 d-flex flex-wrap justify-content-start align-content-start ">
            {pokemon_types.length > 0 && <Types data={pokemon_types} />}
          </div>
        </div>
        <section /* TABLE */>
          {pokemon_display.length > 0 && (
            <Table
              data={pokemon_display}
              sorts={sortsTypes}
              colors={colors}
              isAsc={isAsc}
            />
          )}
        </section>
      </div>
    </>
  );
}

export default App;
