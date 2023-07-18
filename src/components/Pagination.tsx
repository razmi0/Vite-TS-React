import { pagination } from "../utils";
import { Nav, List, ListItem, ButtonList, Text } from "../ui";
import { createContext } from "react";

interface PaginationProps {
  data_length: number;
  page_length: number;
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  handleIndexedPage: (index: number) => void;
  activePage: number;
}

function Pagination({
  data_length,
  page_length,
  handlePreviousPage,
  handleNextPage,
  handleIndexedPage,
  activePage,
}: PaginationProps) {
  const pages: number[] = Array.from(
    { length: Math.ceil(data_length / page_length) },
    (_, i) => i + 1
  );

  const displayed_pages = pagination(pages, activePage);
  // ◀
  return (
    <Nav aria-label="Page navigation table">
      <List mode="HPage">
        <ListItem>
          <ButtonList
            onClick={() => handleIndexedPage(pages[0])}
            icon="./chevron-left.png"
          />
        </ListItem>
        <ListItem>
          <ButtonList onClick={handlePreviousPage}>
            <Text mode="pagination">Prev</Text>
          </ButtonList>
        </ListItem>
        {displayed_pages.map((page, i) => (
          <ListItem key={i}>
            <ButtonList
              onClick={() => handleIndexedPage(page)}
              activeValue={activePage === page}
            >
              {page}
            </ButtonList>
          </ListItem>
        ))}

        <ListItem>
          <ButtonList onClick={handleNextPage}>
            <Text mode="pagination">Next</Text>
          </ButtonList>
        </ListItem>
        <ListItem>
          <ButtonList
            onClick={() => handleIndexedPage(pages[pages.length - 1])}
            icon="./chevron-right.png"
          ></ButtonList>
        </ListItem>
      </List>
    </Nav>
  );
}

export default Pagination;
