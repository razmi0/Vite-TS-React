//#region IMPORTS
import { Table, Filters } from "./components";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import { SortsKeys, Fams, checkedFams, Pokemon, DataType } from "./types";
import "./App.css";
import { Heading, Loader, HStack, Spacer, Container } from "./ui";
import { mergeAtIndex, prepareData } from "./utils";
import {
  filterByFam,
  countTypes,
  filterByMode,
  filterBySearch,
} from "./filters";

//#endregion IMPORTS

/* App component local variables */
const url = "http://localhost:4444/pokemons";
let sortsKeys = [] as SortsKeys;
let count = 0;
const isAsc = true;
let fams = [] as Fams[];
let fams_displayed = [] as Fams[];
let fuse = {} as Fuse<DataType>;
const fuseOptions = {
  includeScore: true,
  keys: ["name"],
};

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
  const [isPureSwitchOn, setIsPureSwitchOn] = useState(false);
  const [isDoubleSwitchOn, setIsDoubleSwitchOn] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false]);
  const [search, setSearch] = useState("");

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

  //#region FILTERS

  fams_displayed = [
    ...new Set(pokemons.flatMap((item) => item.type)),
  ] as Fams[];

  if (isPureSwitchOn) {
    pokemons = filterByMode(pokemons, "PURE");
  }

  if (isDoubleSwitchOn) {
    pokemons = filterByMode(pokemons, "DOUBLE");
  }
  pokemons = filterByFam(pokemons, checkedFams);

  if (search.length > 0) {
    const fuse = new Fuse(pokemons, fuseOptions);
    const result = fuse.search(search);
    pokemons = filterBySearch(pokemons, result);
    fams_displayed = [
      ...new Set(pokemons.flatMap((item) => item.type)),
    ] as Fams[];
  }

  //#endregion FILTERS

  //#region HANDLERS

  /**
   * Handle the search bar by updating the state of the search | string (search)
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

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

  const { pureLength, doubleLength } = countTypes(pokemons);

  return (
    <Container>
      <Heading text={"Pokemon Table"} as={"h1"} />
      {loading && <Loader color="success" />}
      {!loading && (
        <HStack>
          <Filters
            rawLength={rawLength}
            filterLength={pokemons.length}
            data={fams_displayed}
            checked={checked}
            handleToggle={handleToggle}
            handlePureSwitch={handlePureSwitch}
            isPureSwitchOn={isPureSwitchOn}
            handleDoubleSwitch={handleDoubleSwitch}
            isDoubleSwitchOn={isDoubleSwitchOn}
            pureLength={pureLength}
            doubleLength={doubleLength}
            search={search}
            handleSearch={handleSearch}
          />
          <Spacer />
          <Table data={pokemons} sorts={sortsKeys} isAsc={isAsc} />
        </HStack>
      )}

      {/* {calcPerf(t1, count, "App")} */}
    </Container>
  );
}

export default App;
