//#region IMPORTS

import { Table, Range, Checkboxes, Switches } from "./components";
// import pokemon from "./data.json";
import { useEffect, useState } from "react";
import { DataTypes, SortsKeys, Fams, CheckedTypes, Pokemon } from "./types";
import "./App.css";
import { mergeAtIndex, calcPerf, prepareData } from "./utils";
import {
  filterByQuantity,
  filterByVisibility,
  filterByFam,
  countTypes,
  filterByPure,
  filterByDouble,
} from "./filters";

//#endregion IMPORTS

/* App component global scope variables */
const url = "http://localhost:4444/pokemons";
let sortsKeys: SortsKeys = [];
let fams: Fams[] = [];
let fams_displayed: Fams[] = [];
let origin_pokemons: DataTypes = [];
let pokemons: DataTypes = [];
let count = 0;
const isAsc = true;

/* --------- */
/* COMPONENT */
/* --------- */

function App() {
  count++;
  console.log("/*** APP COMPONENT ***/ : ", count);

  count++;
  let t1 = performance.now();

  const [raw, setRaw] = useState<Pokemon[]>([]);
  const [rawLength, setRawLength] = useState<number>(0);
  const [pokemonQuantity, setPokemonQuantity] = useState<number>(10);
  const [isPureSwitchOn, setIsPureSwitchOn] = useState<boolean>(false);
  const [isDoubleSwitchOn, setIsDoubleSwitchOn] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean[]>([]);

  /**
   * Fetching
   */
  useEffect(() => {
    console.log("UE : fetching computed");
    const fetching = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setRaw(data);
    };
    fetching();
  }, []);

  /**
   * Initial setup
   */
  useEffect(() => {
    console.log("UE: initial setup");
    if (raw.length === 0) return;
    setRawLength(raw.length);
    fams = [...new Set(raw.flatMap((item) => item.type))] as Fams[];
    setChecked(() => new Array(fams.length).fill(false));
    pokemons = prepareData(raw);
    sortsKeys = Object.keys(pokemons[0]) as SortsKeys;
    pokemons = filterByQuantity(pokemons, pokemonQuantity);
  }, [raw]);

  /**
   * Quantity
   */
  useEffect(() => {
    console.log("UE: quantity computed");
    pokemons = filterByQuantity(pokemons, pokemonQuantity);
    fams_displayed = [
      ...new Set(pokemons.flatMap((item) => item.type)),
    ] as Fams[];
  }, [pokemonQuantity]);

  /**
   * Pure
   */
  useEffect(() => {
    console.log("UE: pure computed");
    if (isPureSwitchOn) pokemons = filterByPure(pokemons);
  }, [isPureSwitchOn]);

  /**
   * Double
   */
  useEffect(() => {
    console.log("UE: double computed");
    if (isDoubleSwitchOn) pokemons = filterByDouble(pokemons);
  }, [isDoubleSwitchOn]);

  /**
   * Fam
   **/
  useEffect(() => {
    console.log("UE: fam computed");
    const checkedFams: CheckedTypes = mergeAtIndex(
      fams,
      checked,
      "type",
      "isChecked"
    );
    pokemons = filterByFam(pokemons, checkedFams);
  }, [checked]);

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

  //#endregion HANDLERS
  console.log(pokemons.length);
  const refined_pokemons = filterByVisibility(pokemons);
  console.log(refined_pokemons.length);
  const { pureLength, doubleLength } = countTypes(refined_pokemons);

  return (
    <>
      <h1 className="mt-3 mb-3 text-center"> Pokemon Table </h1>
      <div className="px-2 d-flex">
        <section
          /* FILTERS */ className="types_wrapper border_wrapper ms-2 p-3 d-flex flex-column col-4 flex-wrap"
        >
          <Range
            pokemonQuantity={pokemonQuantity}
            rawLength={rawLength}
            displayedLength={refined_pokemons.length}
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
        {refined_pokemons.length && (
          <section className="table-section col-7" /* TABLE */>
            <Table data={pokemons} sorts={sortsKeys} isAsc={isAsc} />
          </section>
        )}
        {refined_pokemons.length === 0 && (
          <div className="text-center"> No pokemon found </div>
        )}
      </div>
      {/* {calcPerf(t1, count, "App")} */}
    </>
  );
}

export default App;
