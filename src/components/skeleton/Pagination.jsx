import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";
import { Link } from "react-router-dom";
const Pagination = ({ page, perPage, count, path }) => {
  const totalLinks = Math.ceil(count / perPage);
  let startLoop = page - 2;
  let endLoop = page + 2;

  // Adjust startLoop and endLoop when they go beyond the valid page range
  if (startLoop < 1) {
    startLoop = 1;
    endLoop = Math.min(totalLinks, startLoop + 4); // Show at most 5 pages
  }

  if (endLoop > totalLinks) {
    endLoop = totalLinks;
    startLoop = Math.max(1, endLoop - 4); // Show at most 5 pages
  }

  const links = () => {
    const allLinks = [];
    for (let i = startLoop; i <= endLoop; i++) {
      allLinks.push(
        <li key={i}>
          <Link
            to={`/${path}/${i}`}
            className={`pagination-link ${i === page ? "pagination-active" : ""}`}
          >
            {i}
          </Link>
        </li>
      );
    }
    return allLinks;
  };

  const next = () => {
    if (page < totalLinks) {
      return (
        <li>
          <Link to={`/${path}/${page + 1}`} className="pagination-link">
            <BsChevronDoubleRight size={20} />
          </Link>
        </li>
      );
    }
  };

  const prev = () => {
    if (page > 1) {
      return (
        <li>
          <Link to={`/${path}/${page - 1}`} className="pagination-link">
            <BsChevronDoubleLeft size={20} className="text-sm" />
          </Link>
        </li>
      );
    }
  };

  return (
    count > perPage && (
      <ul className="flex items-center">
        {prev()}
        {links()}
        {next()}
      </ul>
    )
  );
};

export default Pagination;
