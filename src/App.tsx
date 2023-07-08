import { Table, Range, Types, Switch } from "./components";
// import pokemon from "./data.json";
import { urls } from "./utils/staticData";
import { useEffect, useState } from "react";
import { DataTypes, SortsKeys, KeyOfDataType, Fams, Data } from "./sharedTypes";

import {
  mergeAtIndex,
  calcPerf,
  changeLength,
  prepareData,
  fetchPokemons,
} from "./utils";
import {
  filterByQuantity,
  filterByVisibility,
  filterByFam,
  countTypes,
} from "./filters";
import { CheckedTypes } from "./sharedTypes/index";
import "./App.css";

/* App component local variables */
let count = 0;
const isAsc = true;
const initial_state: boolean[] = new Array(10).fill(false);
let uniqueDisplayedFams: Fams[] = [];
let sortsKeys = [] as SortsKeys;
/* --------- */
/* COMPONENT */
/* --------- */

function App() {
  count++;
  let t1 = performance.now();
  console.log("/** App rendering **/");

  const [pokemon, setPokemon] = useState<Data[]>([]);
  const [pokemonQuantity, setPokemonQuantity] = useState(10);
  const [isPureSwitchOn, setIsPureSwitchOn] = useState(false);
  const [isDoubleSwitchOn, setIsDoubleSwitchOn] = useState(false);
  const [checked, setChecked] = useState(initial_state);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemons(urls);
      console.log("useEffect");
      setPokemon(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (uniqueDisplayedFams.length !== 0) {
      setChecked(changeLength(uniqueDisplayedFams.length, checked));
    }
  }, [uniqueDisplayedFams]);

  const poksLength = pokemon.length;
  let pokemon_display: DataTypes = prepareData(pokemon);

  if (sortsKeys.length !== 0) {
    sortsKeys = Object.keys(pokemon_display[0]) as KeyOfDataType[];
  }

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
    // setChecked(changeLength(uniqueDisplayedFams.length, checked));
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

  const [pureLength, doubleLength] = countTypes(pokemon_display);

  //#endregion HANDLERS

  if (pokemon.length !== 0) {
    pokemon_display = filterByQuantity(pokemon, pokemonQuantity);

    uniqueDisplayedFams = [
      ...new Set(pokemon_display.flatMap((item) => item.type)),
    ] as Fams[];

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

    const checkedTypes: CheckedTypes = mergeAtIndex(
      uniqueDisplayedFams,
      checked,
      "type",
      "isChecked"
    );

    pokemon_display = filterByFam(pokemon_display, checkedTypes);
  }

  return (
    <>
      <h1 className="mt-5 mb-5 text-center"> Pokemon Table </h1>
      {!pokemon && (
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {pokemon_display && (
        <div className="px-5 flex-grow-1 d-flex flex-column">
          <section /* FILTERS */ className="mb-3 pt-3 row flex-nowrap">
            <div className="col-3 pt-3 border_wrapper">
              <Range
                pokemonQuantity={pokemonQuantity}
                setPokemonQuantity={setPokemonQuantity}
                poksLength={poksLength}
                handleChange={handleChange}
              />
              <div className="form-label fw-bold mt-3">Filtered :</div>
              <span className="my-4">{pokemon_display.length} pokemons </span>
            </div>
            <div className="types_wrapper col-4 border_wrapper ms-2 pt-3">
              <div className="d-flex flex-wrap justify-content-start align-content-start mb-3">
                <Types
                  data={uniqueDisplayedFams as Fams[]}
                  checked={checked}
                  handleToggle={handleToggle}
                />
              </div>
              <Switch
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
            <section className="table-section" /* TABLE */>
              <Table data={pokemon_display} sorts={sortsKeys} isAsc={isAsc} />
            </section>
          )}
          {pokemon_display.length === 0 && (
            <div className="text-center"> No pokemon found </div>
          )}
        </div>
      )}
      <footer className="footer"> ¤¤¤¤ </footer>
      {calcPerf(t1, count, "App")}
    </>
  );
}

export default App;
