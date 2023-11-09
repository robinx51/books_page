import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookData } from './api';
import { useFavorites } from './favoritesProvider';
import favoriteImage from './images/favorite.png';
import noFavoriteImage from './images/no_favorite.png';

export function resultPage(books: BookData[] | null) {
  const [currentPage, setCurrentPage] = useState(1);
  const { isBookInFavorites, removeFromFavorites, addToFavorites } =
    useFavorites();
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let booksToDisplay;
  let endPage = 1;

  if (books?.length) {
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

  const currentPathname = window.location.pathname;

  const pageContent = (
    <div>
      <div>
        {booksToDisplay ? (
          <>
            {booksToDisplay.map((book) => (
              <div className="book secondColor" key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <div className="imageCover" title={book.title}>
                    <img
                      className="image"
                      src={book.coverImage}
                      alt="Обложка книги"
                      width="128"
                      height="198"
                    />
                  </div>
                </Link>
                <div className="info">
                  <h3 title={book.title} className="three-line-ellipsis">
                    {book.title}
                  </h3>
                  <p
                    title={book.authors.join(', ')}
                    className="three-line-ellipsis"
                  >
                    Автор(ы): {book.authors.join(', ')}
                  </p>
                  {isBookInFavorites(book) ? (
                    <button
                      onClick={() => removeFromFavorites(book)}
                      className="favoritesButton removeFromFavorites"
                    >
                      <div className="favoritesIcon">
                        <img src={favoriteImage} height={32} />
                      </div>
                      <div className="text">Удалить из избранных</div>
                    </button>
                  ) : (
                    <button
                      onClick={() => addToFavorites(book)}
                      className="favoritesButton addToFavorites"
                    >
                      <div className="favoritesIcon">
                        <img src={noFavoriteImage} />
                      </div>
                      <div className="text">Добавить в избранное</div>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>
            {currentPathname == '/favorites' ? (
              <p className="noSearchResults">Список избранных книг пуст.</p>
            ) : (
              <p className="noSearchResults">Нет результатов поиска.</p>
            )}
          </div>
        )}
      </div>
      <div className="pagination">
        <button
          className="paginationButton"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage == 1}
        >
          Prev
        </button>
        {buttons}
        <button
          className="paginationButton"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage == endPage}
        >
          Next
        </button>
      </div>
    </div>
  );

  return pageContent;
}

export function navigationBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const currentPathname = window.location.pathname;

  return (
    <div className="navigationBar mainColor">
      <h2 className="mainPage">
        {currentPathname == '/' ? (
          <>Главная страница</>
        ) : (
          <Link to="/" className="link">
            Главная страница
          </Link>
        )}
      </h2>
      <div className="searchBar">
        <input
          name="searchInput"
          className="searchInput"
          type="text"
          placeholder="Поиск книг"
          maxLength = {35}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button
          className="searchButton"
          disabled={!query}
          onClick={() => navigate(`/search/${query}`, { replace: false })}
        >
          Поиск
        </button>
      </div>
      <h2 className="navigateToFavoritesButton">
        {currentPathname == '/favorites' ? (
          <>Избранное</>
        ) : (
          <Link to="/favorites" className="link">
            Избранное
          </Link>
        )}
      </h2>
    </div>
  );
}