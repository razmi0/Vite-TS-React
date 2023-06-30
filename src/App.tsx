import { Table, Range, Types } from "./components/index";
import pokemon from "./data.json";
import { useEffect, useState } from "react";
import { DataTypes, SortsTypes, KeyOfDataType } from "./SharedTypes/types";
import "./App.css";
import { isChecked } from "./utils/functions";

function calcPerf(t1: number, count: number) {
  performance.now() - t1;
  // console.table({ count, App_renderingTime: performance.now() - t1 });
}

function changeLength<T>(targetLength: number, user: T[]): T[] {
  const diff = targetLength - user.length;
  console.log(diff);
  if (diff > 0) {
    const filler = new Array(diff).fill(false);
    user = user.concat(filler);
  } else if (diff < 0) {
    user = user.slice(0, diff);
  }
  return user;
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

  /* TOTAL TYPES */
  const pokemon_types = pokemon.flatMap((item) => item.type);
  const uniqueTypes = [...new Set(pokemon_types)];
  /* DISPLAYED AND DYNAMIC TYPES */
  const displayedTypes = pokemon_display.flatMap((item) => item.type);
  const uniqueDisplayedTypes = [...new Set(displayedTypes)];

  const [checked, setChecked] = useState(
    new Array(uniqueDisplayedTypes.length).fill(false) // uniqueTypes.length -
  );

  const handleToggle = (index: number) => {
    const updatedCheckedState: boolean[] = checked.map((item, i) => {
      return i === index ? !item : item;
    });

    setChecked(updatedCheckedState);
  };

  const handleChange = (value: number): void => {
    if (value < 1) {
      value = 1;
    }
    setUserPoksLength(value);
  };

  const isAsc = true;

  const sortsTypes: SortsTypes = Object.keys(
    pokemon_display[0]
  ) as KeyOfDataType[];

  useEffect(() => {
    console.log("App useEffect");
    setChecked(changeLength(uniqueDisplayedTypes.length, checked));
  });

  const checkedTypes = () => {
    if (isChecked(checked) !== -1) {
    }
  };
  // console.log(checked);

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
              handleChange={handleChange}
            />
          </div>
          <div className="col-5 d-flex flex-wrap justify-content-start align-content-start ">
            {uniqueTypes.length > 0 && (
              <Types
                data={uniqueDisplayedTypes}
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
              checkedTypes={checkedTypes}
              // si dans checked ya un seul true alors j'affiche que celui la ou les autres si plus
              // sinon j'affiche tous. donc si true j'affiche data[index] de checkedTypes[index] ===true
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
