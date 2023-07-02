//#region IMPORTS

import { Table, Range, Checkboxes, Switches } from "./components";
import pokemon from "./data.json";
import { useState } from "react";
import { DataTypes, SortsKeys, KeyOfDataType, Fams } from "./types";
import "./App.css";
import { mergeAtIndex, calcPerf, prepareData } from "./utils";
import {
  filterByQuantity,
  filterByVisibility,
  filterByFam,
  countTypes,
} from "./filters";
import { CheckedTypes } from "./types/index";

//#endregion IMPORTS

/* App component local variables */

const poksLength = pokemon.length;
let count = 0;
const isAsc = true;
const fams = [...new Set(pokemon.flatMap((item) => item.type))] as Fams[];
const initialState: boolean[] = new Array(fams.length).fill(false);

/* --------- */
/* COMPONENT */
/* --------- */

function App() {
  console.log("/********** APP COMPONENT **********/");

  count++;
  let t1 = performance.now();

  const [pokemonQuantity, setPokemonQuantity] = useState(10);
  const [isPureSwitchOn, setIsPureSwitchOn] = useState(false);
  const [isDoubleSwitchOn, setIsDoubleSwitchOn] = useState(false);
  const [checked, setChecked] = useState(initialState);

  let pokemon_display: DataTypes = prepareData(pokemon);
  pokemon_display = filterByQuantity(pokemon, pokemonQuantity);

  const sortsKeys: SortsKeys = Object.keys(
    pokemon_display[0]
  ) as KeyOfDataType[];

  const fams_displayed = [
    ...new Set(pokemon_display.flatMap((item) => item.type)),
  ] as Fams[];

  //#region FILTERS SWITCHES

  if (isPureSwitchOn) {
    pokemon_display.map(
      (item) => (item.visible = item.type.length === 1 ? true : false)
    );

    pokemon_display = filterByVisibility(pokemon_display);
  }

  if (isDoubleSwitchOn) {
    pokemon_display.map(
      (item) => (item.visible = item.type.length > 1 ? true : false)
    );
    pokemon_display = filterByVisibility(pokemon_display);
  }

  //#endregion FILTERS SWITCHES

  const checkedTypes: CheckedTypes = mergeAtIndex(
    fams,
    checked,
    "type",
    "isChecked"
  );

  pokemon_display = filterByFam(pokemon_display, checkedTypes);

  //#region HANDLERS

  /**
   * Handle the toggle fam checkbox dynamic, change checkbox states | bool[] (checked)
   * @param index
   */
  const handleToggle = (index: number) => {
    const updatedCheckedState: boolean[] = checked.map((item, i) => {
      return i === index ? !item : item;
    });
    setChecked(() => updatedCheckedState);
  };
  /**
   * Handle the range user output by updating length pokemons displayed array state | number (pokemonQuantity)
   * @param value
   */
  const handleChange = (value: number): void => {
    if (value < 1) {
      value = 1;
    }
    setPokemonQuantity(value);
  };
  /**
   * Handle the pure switch button by updating the state of the switch | boolean (isPureSwitchOn)
   * @param isChecked
   */
  const handlePureSwitch = (isChecked: boolean) => {
    setIsPureSwitchOn(!isChecked);
    if (isDoubleSwitchOn) {
      setIsDoubleSwitchOn(false);
    }
  };
  /**
   * Handle the double switch button by updating the state of the switch | boolean (isDoubleSwitchOn)
   * @param isChecked
   */
  const handleDoubleSwitch = (isChecked: boolean) => {
    setIsDoubleSwitchOn(!isChecked);
    if (isPureSwitchOn) {
      setIsPureSwitchOn(false);
    }
  };

  const { pureLength, doubleLength } = countTypes(pokemon_display);

  //#endregion HANDLERS

  return (
    <>
      <h1 className="mt-3 mb-3 text-center"> Pokemon Table </h1>
      <div className="px-2 d-flex">
        <section
          /* FILTERS */ className="types_wrapper border_wrapper ms-2 p-3 d-flex flex-column col-4 flex-wrap"
        >
          <Range
            pokemonQuantity={pokemonQuantity}
            poksLength={poksLength}
            displayedLength={pokemon_display.length}
            handleChange={handleChange}
          />

          <div className="spacer"></div>

          <div>
            <div className="d-flex flex-wrap justify-content-start align-content-start mb-1">
              <Checkboxes
                data={fams_displayed}
                checked={checked}
                handleToggle={handleToggle}
              />
            </div>
            <Switches
              handlePureSwitch={handlePureSwitch}
              isPureSwitchOn={isPureSwitchOn}
              handleDoubleSwitch={handleDoubleSwitch}
              isDoubleSwitchOn={isDoubleSwitchOn}
              pure_quantity={pureLength}
              double_quantity={doubleLength}
            />
          </div>
        </section>
        {pokemon_display.length && (
          <section className="table-section col-7" /* TABLE */>
            <Table data={pokemon_display} sorts={sortsKeys} isAsc={isAsc} />
          </section>
        )}
        {pokemon_display.length === 0 && (
          <div className="text-center"> No pokemon found </div>
        )}
      </div>
      {calcPerf(t1, count, "App")}
    </>
  );
}

export default App;
