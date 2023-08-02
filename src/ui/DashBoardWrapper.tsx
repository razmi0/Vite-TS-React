import { Container, Heading, VStack } from ".";

function DashBoardWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Container mode="dflt">
      <Heading text={"Pokemon Table"} as={"h1"} />
      <VStack
        sx={{
          gap: "1rem",
        }}
      >
        {children}
      </VStack>
    </Container>
  );
}

export default DashBoardWrapper;
