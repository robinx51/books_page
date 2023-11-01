//import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { searchBooks, BookData } from './api';

function SearchPage() {
  const [query, setQuery] = useState('');
  let [books, setBooks] = useState<BookData[] | null>(null);

  let prevQuery = useParams<{ prevQuery?: string }>().prevQuery;
  const count = 20;

  const handleSearch = async () => {
    if (prevQuery) {
      query ? prevQuery = query : prevQuery;
      console.log(prevQuery, query);
      let books;
      searchBooks(prevQuery, count).then((result) => {
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
      <div className="navigationBar">
        <h2 className='mainPage'><Link to="/" className="link">Главная страница</Link></h2>
        <div className='searchBar'>
          <input
            className='searchInput'
            type="text"
            placeholder="Поиск книг"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to={`/search/${query}`}>
            <button onClick={handleSearch} className='searchButton'>Поиск</button>
          </Link>
        </div>
        <h2 className='searchResult'>Результаты по запросу: {prevQuery}</h2>
      </div>
      <div className="resultPage">
        {books ? (
          <>
            {books.map((book) => (
              <li className="book" key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <div className="imageCover">
                    {book.coverImage && (
                      <img
                        src={book.coverImage}
                        alt="Обложка книги"
                        width="128"
                        height="198"
                      />
                    )}
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
    </div>
  );
}

export default SearchPage;
