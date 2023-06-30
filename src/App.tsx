import { Table, Range, Types, Switch } from "./components";
import pokemon from "./data.json";
import { useEffect, useState } from "react";
import {
  DataTypes,
  SortsTypes,
  KeyOfDataType,
  CheckedTypes,
} from "./SharedTypes";
import "./App.css";
import {
  mergeAtIndex,
  checkIfAllFalse,
  updateVisibility,
  calcPerf,
  changeLength,
} from "./utils";
import { colors } from "./utils/staticData";

/* App component local variables */

const poksLength = pokemon.length;
let count = 0;
const isAsc = true;

/* --------- */
/* COMPONENT */
/* --------- */

function App() {
  count++;
  let t1 = performance.now();
  const [userPoksLength, setUserPoksLength] = useState(10);
  const [isPureSwitchOn, setIsPureSwitchOn] = useState(false);
  const [isDoubleSwitchOn, setIsDoubleSwitchOn] = useState(false);

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
        visible: true,
      };
    });

  /* ---------------- */
  /* TOTAL SORT TYPES */
  /* ---------------- */

  const sortsTypes: SortsTypes = Object.keys(
    pokemon_display[0]
  ) as KeyOfDataType[];

  /* ----------- */
  /* TOTAL TYPES */
  /* ----------- */

  const pokemon_types = pokemon.flatMap((item) => item.type);
  const uniqueTypes = [...new Set(pokemon_types)];

  /* ------ */
  /* DISPLAYED AND DYNAMIC TYPES */
  /* ------ */

  const displayedTypes = pokemon_display.flatMap((item) => item.type);
  const uniqueDisplayedTypes = [...new Set(displayedTypes)];
  /* ------ */

  const [checked, setChecked] = useState(
    new Array(uniqueDisplayedTypes.length).fill(false)
  );

  //#region HANDLERS

  /**
   * Handle the toggle checkbox dynamic, change checkbox states | bool[] (checked)
   * @param index
   */
  const handleToggle = (index: number) => {
    const updatedCheckedState: boolean[] = checked.map((item, i) => {
      return i === index ? !item : item;
    });
    setChecked(updatedCheckedState);
  };
  /**
   * Handle the range user output by updating length pokemons displayed array state | number (userPoksLength)
   * @param value
   */
  const handleChange = (value: number): void => {
    if (value < 1) {
      value = 1;
    }
    setUserPoksLength(value);
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

  useEffect(() => {
    console.log("App useEffect");
    setChecked(changeLength(uniqueDisplayedTypes.length, checked));
    /**
     * Contain informations about the state of the checkboxes and the types of the pokemon displayed | {type: string, visible: boolean}[]
     */
    const checkedTypes: CheckedTypes = mergeAtIndex(
      uniqueDisplayedTypes,
      checked,
      "type",
      "isChecked"
    );
    /* If all checkbox are false => we display all pokemons */
    if (checkIfAllFalse(checked) && !isPureSwitchOn && !isDoubleSwitchOn) {
      pokemon_display.map((item) => (item.visible = true));
    } else {
      /* else if at least one true => all visible false except type check (true) */
      updateVisibility(
        pokemon_display,
        checkedTypes,
        isPureSwitchOn,
        isDoubleSwitchOn
      );
    }
  });

  return (
    <>
      <h1 className="mt-5 mb-5 text-center"> Pokemon Table </h1>
      <div className="px-5">
        <section /* FILTERS */ className="mb-3 pt-3 row flex-nowrap">
          <div className="col-3 pt-3 border_wrapper">
            <Range
              userPoksLength={userPoksLength}
              setUserPoksLength={setUserPoksLength}
              poksLength={poksLength}
              handleChange={handleChange}
            />
          </div>
          <div className="types_wrapper col-4 border_wrapper ms-2 pt-3">
            <div className="d-flex flex-wrap justify-content-start align-content-start mb-3">
              {uniqueTypes.length > 0 && (
                <Types
                  data={uniqueDisplayedTypes}
                  checked={checked}
                  handleToggle={handleToggle}
                />
              )}
            </div>
            <Switch
              handlePureSwitch={handlePureSwitch}
              isPureSwitchOn={isPureSwitchOn}
              handleDoubleSwitch={handleDoubleSwitch}
              isDoubleSwitchOn={isDoubleSwitchOn}
            />
          </div>
        </section>
        <section className="table-section" /* TABLE */>
          {pokemon_display.length > 0 && (
            <Table
              data={pokemon_display}
              sorts={sortsTypes}
              colors={colors}
              isAsc={isAsc}
              // si dans checked ya un seul true alors j'affiche que celui la ou les autres si plus
              // sinon j'affiche tous. donc si true j'affiche data[index] de checkedTypes[index] ===true
            />
          )}
        </section>
      </div>
      <footer className="footer"> ¤¤¤¤ </footer>
      {/* {calcPerf(t1, count, "App")} */}
    </>
  );
}

export default App;
