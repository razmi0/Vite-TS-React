import { Range, Checkboxes, Switches, Spacer } from "./";
import { Fams } from "../types";

interface FilterProps {
  /* RANGE */
  pokemonLength: number;
  rawLength: number;
  filterLength: number;
  handleLength: (value: number) => void;
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
}

function Filters({
  pokemonLength,
  rawLength,
  filterLength,
  handleLength,
  data,
  checked,
  handleToggle,
  handlePureSwitch,
  isPureSwitchOn,
  handleDoubleSwitch,
  isDoubleSwitchOn,
  pureLength,
  doubleLength,
}: FilterProps) {
  return (
    <section className="types_wrapper border_wrapper ms-2 p-3 d-flex flex-column col-4 flex-wrap">
      <Range
        pokemonQuantity={pokemonLength}
        rawLength={rawLength}
        displayedLength={filterLength}
        handleChange={handleLength}
      />
      <Spacer />
      <div>
        <Checkboxes data={data} checked={checked} handleToggle={handleToggle} />
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
  );
}

export default Filters;
