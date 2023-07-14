import React from "react";
import { Container, Divider, IconInput } from "../ui";

interface SearchProps {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search({ search, handleSearch }: SearchProps) {
  return (
    <>
      <Divider />
      <Container>
        <IconInput
          url="/icon_search.svg"
          placeholder="Search by name"
          onChange={(e) => handleSearch(e)}
          value={search}
        />
      </Container>
      <Divider />
    </>
  );
}

export default Search;
