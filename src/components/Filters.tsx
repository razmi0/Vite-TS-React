import { ChangeEvent, useState } from "react";
import { Range, Checkboxes, Switches, Search } from "./";
import { Spacer, Section, Container } from "../ui";
import { Fams } from "../types";

interface FilterProps {
  /* RANGE */
  rawLength: number;
  filterLength: number;
  /* CHECKBOXES FAMS */
  data: Fams[];
  checked: boolean[];
  handleToggle: (index: number) => void;
  /* CHECKBOXES MODE */
  handlePureSwitch: (isChecked: boolean) => void;
  isPureSwitchOn: boolean;
  handleDoubleSwitch: (isChecked: boolean) => void;
  isDoubleSwitchOn: boolean;
  pureLength: number;
  doubleLength: number;
  search: string;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Filters({
  rawLength,
  filterLength,
  data,
  checked,
  handleToggle,
  handlePureSwitch,
  isPureSwitchOn,
  handleDoubleSwitch,
  isDoubleSwitchOn,
  pureLength,
  doubleLength,
  search,
  handleSearch,
}: FilterProps) {
  const [selectedFam, setSelectedFam] = useState(null); // [Fams
  console.log("Filters rendered");

  return (
    // <Section mode="card">
    <>
      <Range rawLength={rawLength} displayedLength={filterLength} />
      <Search search={search} handleSearch={handleSearch} />
      <Container>
        <Checkboxes data={data} checked={checked} handleToggle={handleToggle} />
        {/* <Spacer /> */}
        <Switches
          handlePureSwitch={handlePureSwitch}
          isPureSwitchOn={isPureSwitchOn}
          handleDoubleSwitch={handleDoubleSwitch}
          isDoubleSwitchOn={isDoubleSwitchOn}
          pure_quantity={pureLength}
          double_quantity={doubleLength}
        />
      </Container>
    </> // </Section>
  );
}

export default Filters;
