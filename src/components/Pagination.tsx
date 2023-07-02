import { pagination } from "../utils";

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

  return (
    <nav aria-label="Page navigation table">
      <ul className="pagination">
        <li className="page-item" onClick={() => handleIndexedPage(pages[0])}>
          <button className="btn no-outline p-1"> ◀◀ </button>
        </li>
        <li className="page-item" onClick={handlePreviousPage}>
          <button className="btn no-outline p-1"> ◀ </button>
        </li>
        {displayed_pages.map((page, i) => (
          <li
            key={i}
            className="page-item"
            onClick={() => handleIndexedPage(page)}
          >
            <button
              className={
                activePage === page
                  ? "page-link no-outline active"
                  : "page-link no-outline"
              }
            >
              {page}
            </button>
          </li>
        ))}

        <li className="page-item" onClick={handleNextPage}>
          <button className="btn no-outline p-1"> ▶ </button>
        </li>
        <li
          className="page-item"
          onClick={() => handleIndexedPage(pages[pages.length - 1])}
        >
          <button className="btn no-outline p-1"> ▶▶ </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
