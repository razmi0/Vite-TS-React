import { ChangeEvent } from "react";
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
  return (
    <Section bsCol="col-4">
      <Range rawLength={rawLength} displayedLength={filterLength} />
      <Search search={search} handleSearch={handleSearch} />
      <Spacer />
      <Container>
        <Checkboxes data={data} checked={checked} handleToggle={handleToggle} />
        <Switches
          handlePureSwitch={handlePureSwitch}
          isPureSwitchOn={isPureSwitchOn}
          handleDoubleSwitch={handleDoubleSwitch}
          isDoubleSwitchOn={isDoubleSwitchOn}
          pure_quantity={pureLength}
          double_quantity={doubleLength}
        />
      </Container>
    </Section>
  );
}

export default Filters;
