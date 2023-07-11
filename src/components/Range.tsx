import { Container, Text } from "../ui";

export function Range({
  rawLength,
  displayedLength,
}: {
  rawLength: number;
  displayedLength: number;
}) {
  return (
    <Container>
      <Container>
        <Text mode="highlight">
          Pokemons :{"  "} {rawLength} pokemons
        </Text>
      </Container>
      <Container>
        <Text mode="highlight">Filtered : {displayedLength} pokemons</Text>
      </Container>
    </Container>
  );
}
