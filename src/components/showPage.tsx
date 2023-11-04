import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookData } from './api';

export function resultPage(books: BookData[] | null) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let booksToDisplay;
  let endPage = 1;

  if (books) {
    booksToDisplay = books.slice(startIndex, endIndex);
    endPage = Math.ceil(books.length / itemsPerPage);
  }

  const buttons = Array.from({ length: endPage }, (_, index) => (
    <a key={index}>
      <button
        className={
          index + 1 == currentPage
            ? 'paginationButton currentPageButton'
            : 'paginationButton'
        }
        onClick={() => setCurrentPage(index + 1)}
        disabled={index + 1 == currentPage}
      >
        {index + 1}
      </button>
    </a>
  ));

  const pageContent = (
    <div className="resultPage mainColor">
      <div className="">
        {booksToDisplay ? (
          <>
            {booksToDisplay.map((book) => (
              <div className="book secondColor" key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <div
                    data-title="Узнать подробную информацию об этой книге"
                  >
                    <img
                      className="imageCover"
                      src={book.coverImage}
                      alt="Обложка книги"
                    />
                  </div>
                </Link>
                <div className="info">
                  <h3>{book.title}</h3>
                  <p>Автор(ы): {book.authors.join(', ')}</p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="noSearchResults">Нет результатов поиска.</p>
        )}
      </div>
      <div className="pagination">
        <button
          className="paginationButton"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {buttons}
        <button
          className="paginationButton"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === endPage}
        >
          Next
        </button>
      </div>
    </div>
  );

  return pageContent;
}

export default resultPage;
