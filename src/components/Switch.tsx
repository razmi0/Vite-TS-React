interface SwitchProps {
  handlePureSwitch: (isSwitchOn: boolean) => void;
  handleDoubleSwitch: (isDoubleSwitchOn: boolean) => void;
  isPureSwitchOn: boolean;
  isDoubleSwitchOn: boolean;
}

function Switch({
  handlePureSwitch,
  isPureSwitchOn,
  handleDoubleSwitch,
  isDoubleSwitchOn,
}: SwitchProps) {
  return (
    <section className="row justify-content-around">
      <div className="form-check my-4">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="switch_pure_type"
          checked={isPureSwitchOn}
          onChange={() => handlePureSwitch(isPureSwitchOn)}
        />
        <label className="form-check-label" htmlFor="switch_pure_type">
          Pure Type
        </label>
      </div>
      <div className="form-check my-4">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="switch_pure_type"
          checked={isDoubleSwitchOn}
          onChange={() => handleDoubleSwitch(isDoubleSwitchOn)}
        />
        <label className="form-check-label" htmlFor="switch_pure_type">
          Doubled Types
        </label>
      </div>
    </section>
  );
}

export default Switch;
