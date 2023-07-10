//#region IMPORTS
import { Table, Range, Checkboxes, Switches, Filters } from "./components";
// import pokemon from "./data.json";
import { useEffect, useMemo, useState } from "react";
import { SortsKeys, Fams, checkedFams, Pokemon } from "./types";
import "./App.css";
import { mergeAtIndex, calcPerf, prepareData } from "./utils";
import {
  filterByQuantity,
  filterByVisibility,
  filterByFam,
  countTypes,
  filterByMode,
} from "./filters";

//#endregion IMPORTS

/* App component local variables */
const url = "http://localhost:4444/pokemons";
let sortsKeys = [] as SortsKeys;
let count = 0;
const isAsc = true;
let fams = [] as Fams[];

/* --------- */
/* COMPONENT */
/* --------- */

function App() {
  console.log("App");

  count++;
  let t1 = performance.now();

  const [loading, setLoading] = useState(true);
  const [raw, setRaw] = useState<Pokemon[]>([]);
  const [rawLength, setRawLength] = useState(0);
  const [pokemonQuantity, setPokemonQuantity] = useState(10);
  const [isPureSwitchOn, setIsPureSwitchOn] = useState(false);
  const [isDoubleSwitchOn, setIsDoubleSwitchOn] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false]);

  /**
   * Fetching
   */
  useEffect(() => {
    console.log("UE : fetching computed");
    const fetching = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setRaw(data);
      setLoading(false);
    };
    fetching();
  }, []);

  /**
   * Initial setup on fetch resolve ( setRaw )
   */
  useEffect(() => {
    console.log("UE: initial setup");
    if (raw.length === 0) return;
    setRawLength(raw.length);
    fams = [...new Set(raw.flatMap((item) => item.type))] as Fams[];
    setChecked(() => new Array(fams.length).fill(false));
    sortsKeys = Object.keys(pokemons[0]) as SortsKeys;
  }, [raw]);

  const checkedFams: checkedFams = mergeAtIndex(
    fams,
    checked,
    "type",
    "isChecked"
  );

  let pokemons = useMemo(() => prepareData(raw), [raw]);

  pokemons = filterByQuantity(raw, pokemonQuantity);

  let fams_displayed = [
    ...new Set(pokemons.flatMap((item) => item.type)),
  ] as Fams[];

  //#region FILTERS SWITCHES

  if (isPureSwitchOn) {
    pokemons = filterByMode(pokemons, "PURE");
  }

  if (isDoubleSwitchOn) {
    pokemons = filterByMode(pokemons, "DOUBLE");
  }

  //#endregion FILTERS SWITCHES

  pokemons = filterByFam(pokemons, checkedFams);

  const { pureLength, doubleLength } = countTypes(pokemons);

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
  console.log("App end");

  return (
    <>
      <h1 className="mt-3 mb-3 text-center"> Pokemon Table </h1>
      {loading && <div className="text-center"> Loading... </div>}
      {!loading && (
        <div className="px-2 d-flex">
          <Filters
            pokemonLength={pokemonQuantity}
            rawLength={rawLength}
            filterLength={pokemons.length}
            handleLength={handleChange}
            data={fams_displayed}
            checked={checked}
            handleToggle={handleToggle}
            handlePureSwitch={handlePureSwitch}
            isPureSwitchOn={isPureSwitchOn}
            handleDoubleSwitch={handleDoubleSwitch}
            isDoubleSwitchOn={isDoubleSwitchOn}
            pureLength={pureLength}
            doubleLength={doubleLength}
          />
          <Table data={pokemons} sorts={sortsKeys} isAsc={isAsc} />
        </div>
      )}

      {/* {calcPerf(t1, count, "App")} */}
    </>
  );
}

export default App;
