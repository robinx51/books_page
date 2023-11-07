import { useState, useEffect } from 'react';
import { resultPage } from './functions/showPage.tsx';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { searchBooks, BookData } from './functions/api.tsx';

function SearchPage() {
  const [query, setQuery] = useState('');
  let prevQuery = useParams<{ prevQuery?: string }>().prevQuery;
  const navigate = useNavigate();
  let [books, setBooks] = useState<BookData[] | null>(null);
  
  const handleSearch = async () => {
    if (query) {
      navigate(`/search/${query}`, { replace: false });
    }
    if (prevQuery) {
      query ? (prevQuery = query) : prevQuery;

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
    <div>
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
          <button
            className="searchButton"
            disabled={!query}
            onClick={handleSearch}
          >
            Поиск
          </button>
        </div>
        <h2 className='favoritesButton'><Link to='/favorites' className="link">
          Избранное
        </Link></h2>
      </div>
      <div className="resultPage mainColor">
        {resultPage(books)}
      </div>
    </div>
  );
}

export default SearchPage;
