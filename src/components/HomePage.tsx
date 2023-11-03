import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { searchBooks, BookData } from './api';

function HomePage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<BookData[] | null>(null);
  const navigate = useNavigate(); // Аналогия Link
  const keywords = [
    'javascript',
    'css',
    'react',
    'python',
    'web development',
    'frontend',
    'backend',
    'programming',
    'data science',
    'neural web',
  ];
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

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

  useEffect(() => {
    let books;
    searchBooks(randomKeyword).then((result) => {
      books = result;
      setBooks(books);
    });
  }, []);

  return (
    <div>
      <div className="navigationBar mainColor">
        <h2 className="mainPage">Главная страница</h2>
        <div className="searchBar">
          <input
            className="searchInput"
            type="text"
            placeholder="Поиск книг"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
            <button className="searchButton" disabled={!query} onClick={() => navigate(`/search/${query}`, { replace: false })} >Поиск</button>
        </div>
        <h2 className="searchResult">Случайные книги по тематике {randomKeyword}</h2>
      </div>
      <div className="resultPage">
        {booksToDisplay ? (
          <>
            {booksToDisplay.map((book) => (
              <li className="book secondColor" key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <div className="imageCover" data-title="Узнать подробную информацию об этой книге">
                    <img src={book.coverImage}
                      alt="Обложка книги"
                      width="128"
                      height="198"/>
                  </div>
                </Link>
                <div className="info">
                  <h3>{book.title}</h3>
                  <p>Автор(ы): {book.authors.join(', ')}</p>
                </div>
              </li>
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

export default HomePage;
