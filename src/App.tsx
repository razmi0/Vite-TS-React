import { Table, Range, Types } from "./components/index";
import pokemon from "./data.json";
import { useState } from "react";
import { DataTypes, SortsTypes, KeyOfDataType } from "./SharedTypes/types";
import "./App.css";

function calcPerf(t1: number, count: number) {
  performance.now() - t1;
  console.table({ count, App_renderingTime: performance.now() - t1 });
}

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

let count = 0;

/* --------- */
/* COMPONENT */
/* --------- */

function App() {
  count++;
  let t1 = performance.now();
  const [userPoksLength, setUserPoksLength] = useState(10);

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

  const pokemon_types = pokemon_display.flatMap((item) => item.type);

  const uniqueTypes = [...new Set(pokemon_types)];

  const [checked, setChecked] = useState(
    new Array(uniqueTypes.length).fill(false)
  );

  const handleToggle = (index: number) => {
    const updatedCheckedState = checked.map((item, i) =>
      i === index ? !item : item
    );
    setChecked(updatedCheckedState);
  };

  const isAsc = true;

  const sortsTypes: SortsTypes = Object.keys(
    pokemon_display[0]
  ) as KeyOfDataType[];

  return (
    <>
      <h1 className="mt-5 mb-5 text-center"> Pokemon Table </h1>
      <div className="row px-5">
        <div className=" row flex-grow-1 mb-3">
          <div /* FILTERS */ className="col-3">
            <Range
              userPoksLength={userPoksLength}
              setUserPoksLength={setUserPoksLength}
              poksLength={poksLength}
            />
          </div>
          <div className="col-5 d-flex flex-wrap justify-content-start align-content-start ">
            {uniqueTypes.length > 0 && (
              <Types
                data={uniqueTypes}
                checked={checked}
                handleToggle={handleToggle}
              />
            )}
          </div>
        </div>
        <section className="table-section" /* TABLE */>
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
      <footer className="footer"> ¤¤¤¤ </footer>
      {console.log(checked)}
      {calcPerf(t1, count)}
    </>
  );
}

export default App;
