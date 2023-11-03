//import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { searchBooks, BookData } from './api';

function SearchPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  let [books, setBooks] = useState<BookData[] | null>(null);
  let prevQuery = useParams<{ prevQuery?: string }>().prevQuery;
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let booksToDisplay;
  let endPage = 1;

  if (books) {
    booksToDisplay = books.slice(startIndex, endIndex);
    endPage = Math.ceil(books.length/itemsPerPage);
  }
  
  const buttons = Array.from({ length: endPage }, (_, index) => (
    <a key={index}>
      <button 
        className={ index+1 == currentPage ? "paginationButton currentPageButton" : "paginationButton"} 
        onClick={() => setCurrentPage(index+1)} 
        disabled={(index+1) == currentPage}
      >
        {index+1}
      </button>
    </a>
  ));

  const handleSearch = async () => {
    if (query) {navigate(`/search/${query}`, { replace: false })}
    if (prevQuery) {
      query ? (prevQuery = query) : prevQuery;
      
      console.log(prevQuery, query);
      let books;
      searchBooks(prevQuery).then((result) => {
        books = result;
        setBooks(books);
      });
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div className='mainColor'>
      <div className="navigationBar mainColor">
        <h2 className="mainPage">
          <Link to="/" className="link">
            Главная страница
          </Link>
        </h2>
        <div className="searchBar">
          <input
            className="searchInput"
            type="text"
            placeholder="Поиск книг"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="searchButton" disabled={!query} onClick={handleSearch} >Поиск</button>
        </div>
        <h2 className="searchResult">Результаты по запросу: {prevQuery}</h2>
      </div>
      <div className="resultPage">
        {booksToDisplay ? (
          <>
            {booksToDisplay.map((book) => (
              <div className="book secondColor" key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <div className="imageCover" data-title="Узнать подробную информацию об этой книге">
                    <img
                      src={book.coverImage}
                      alt="Обложка книги"
                      width="128"
                      height="198"
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
      <div className='pagination'>
        <button className='paginationButton' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage == 1}>Prev</button>
        {buttons}
        <button className='paginationButton' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage == endPage}>Next</button>
      </div>
    </div>
  );
}

export default SearchPage;
