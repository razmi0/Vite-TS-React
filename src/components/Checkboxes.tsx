import { Fams } from "../types";
import { HStack, Container, Checkbox, Text } from "../ui";

interface CheckboxesProps {
  data: Fams[];
  checked: boolean[];
  handleToggle: (index: number) => void;
}

function Checkboxes({ data, checked, handleToggle }: CheckboxesProps) {
  return (
    <>
      <Container>
        <Text mode="default">Search by types : </Text>
      </Container>
      <HStack sx={{ flexWrap: "wrap" }}>
        {data.map((item, index) => (
          <Container key={index} mode="neutral">
            <Checkbox
              mode="highlight"
              id={index}
              active={checked[index] ? "checked" : "unchecked"}
              checked={checked[index]}
              onChange={() => {
                handleToggle(index);
              }}
            >
              {item}
            </Checkbox>
          </Container>
        ))}
      </HStack>
    </>
  );
}

export default Checkboxes;
