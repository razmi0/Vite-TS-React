import { Container, Divider, Section, Checkbox } from "../ui";

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
    <Section mode="filter">
      <Divider />
      <Container>
        <Checkbox
          id="switch_pure_type"
          checked={isPureSwitchOn}
          onChange={() => handlePureSwitch(isPureSwitchOn)}
          mode="jelly"
        >
          Pure Type ( {pure_quantity} )
        </Checkbox>
      </Container>
      <Container>
        <Checkbox
          id="switch_double_type"
          checked={isDoubleSwitchOn}
          onChange={() => handleDoubleSwitch(isDoubleSwitchOn)}
          mode="jelly"
        >
          Doubled Types ( {double_quantity} )
        </Checkbox>
      </Container>
    </Section>
  );
}

export default Switches;
