//#region IMPORTS
import useData from "../hooks/useData";
import { Table, Filters } from "../components";
import Fuse from "fuse.js";
import { useEffect, useMemo, useState } from "react";
import {
  SortsKeys,
  Fams,
  checkedFams as checkedFamsType,
  DataType,
} from "../types";
import "../App.css";
import { Heading, Loader, HStack, Container, Section, VStack } from "../ui";
import { mergeAtIndex } from "../utils";
import {
  filterByFam,
  countTypes,
  filterByMode,
  filterBySearch,
} from "../filters";
import RadarChart from "../components/Radar";
import { DataContextType } from "../context/DataContext";

//#endregion IMPORTS

/* App component local variables */
let sortsKeys = [] as SortsKeys;
let count = 0;
const isAsc = true;
// let fams = [] as Fams[];
let fams_displayed = [] as Fams[];
const fuseOptions = {
  includeScore: true,
  keys: ["name"],
};
let checkedFams = [] as checkedFamsType;
let pokemons = [] as DataType[];
let rawLength = 0 as number;

/* --------- */
/* COMPONENT */
/* --------- */

const DashboardPage = () => {
  //#region LOGIC

  console.log("App");

  count++;
  let t1 = performance.now();

  const [isPureSwitchOn, setIsPureSwitchOn] = useState(false);
  const [isDoubleSwitchOn, setIsDoubleSwitchOn] = useState(false);
  const [checked, setChecked] = useState<boolean[]>([false]);
  const [search, setSearch] = useState("");

  const { data, loading, error, rawLth, fams, setRefetch } =
    useData() as DataContextType;

  useEffect(() => {
    if (loading === "loaded") {
      pokemons = data;
      rawLength = rawLth;
      fams;
      sortsKeys = Object.keys(pokemons[0]) as SortsKeys;
      setChecked(() => new Array(fams.length).fill(false));
    }
    if (error !== "") {
      setTimeout(() => {
        setRefetch(true);
      }, 3000);
    }
  }, [loading, error]);

  //#region FILTERS

  if (isPureSwitchOn) {
    pokemons = filterByMode(pokemons, "PURE");
  }

  if (isDoubleSwitchOn) {
    pokemons = filterByMode(pokemons, "DOUBLE");
  }
  if (pokemons.length > 0) {
    checkedFams = mergeAtIndex(fams, checked, "type", "isChecked");
    pokemons = filterByFam(pokemons, checkedFams);
    fams_displayed = [
      ...new Set(pokemons.flatMap((item) => item.type)),
    ] as Fams[];
  }

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
  //#endregion LOGIC
  return (
    <>
      {loading === "error" && <Loader color="danger" text={`${error}`} />}
      {loading === "loading" && <Loader color="success" />}
      {loading === "loaded" && (
        <>
          <HStack>
            <Container mode="neutral">
              <Heading as={"h6"} text="Filters" />
              <Section mode="card">
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
              </Section>
            </Container>

            <VStack>
              <Heading as={"h6"} text="Radar Chart" />
              <Section mode="radar">
                <RadarChart data={pokemons} />
              </Section>
            </VStack>
          </HStack>
          {/* <Spacer /> */}
          <VStack
            sx={{
              width: "100%",
            }}
          >
            <Heading as={"h6"} text="Table" />
            <HStack>
              <Section mode="table">
                <VStack>
                  <Table data={pokemons} sorts={sortsKeys} isAsc={isAsc} />
                </VStack>
              </Section>
            </HStack>
          </VStack>
        </>
      )}
    </>
  );
};

export default DashboardPage;
