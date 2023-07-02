interface SwitchProps {
  handlePureSwitch: (isSwitchOn: boolean) => void;
  handleDoubleSwitch: (isDoubleSwitchOn: boolean) => void;
  isPureSwitchOn: boolean;
  isDoubleSwitchOn: boolean;
  pure_quantity: number;
  double_quantity: number;
}

function Switches({
  handlePureSwitch,
  isPureSwitchOn,
  handleDoubleSwitch,
  isDoubleSwitchOn,
  pure_quantity,
  double_quantity,
}: SwitchProps) {
  return (
    <section className="flex-column justify-content-around p-inherit mt-4">
      <hr />
      <div className="form-check my-1">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="switch_pure_type"
          checked={isPureSwitchOn}
          onChange={() => handlePureSwitch(isPureSwitchOn)}
        />
        <label className="form-check-label" htmlFor="switch_pure_type">
          Pure Type ( {pure_quantity} )
        </label>
      </div>
      <div className="form-check my-1">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="switch_pure_type"
          checked={isDoubleSwitchOn}
          onChange={() => handleDoubleSwitch(isDoubleSwitchOn)}
        />
        <label className="form-check-label" htmlFor="switch_pure_type">
          Doubled Types ( {double_quantity} )
        </label>
      </div>
    </section>
  );
}

export default Switches;
