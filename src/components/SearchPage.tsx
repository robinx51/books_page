//import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { searchBooks, BookData } from './api';

function SearchPage() {
  const [query, setQuery] = useState(''); // Запрос пользователя
  let [books, setBooks] = useState<BookData[] | null>(null);

  const prevQuery = useParams<{ prevQuery?: string }>().prevQuery;
  const count = 12;

  console.log(prevQuery);

  if (prevQuery) {
    useEffect(() => {
      let books;
      searchBooks(prevQuery, count).then((result) => {
        books = result;
        setBooks(books);
      });
    }, []);
  }
  return (
    <div>
      <div className="navigationBar">
        <input
          className="searchBar"
          type="text"
          placeholder="Поиск книг"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Link to={`/search/${query}`}>
          <button>Поиск</button>
        </Link>
      </div>
      <h1>Результаты по запросу: {prevQuery}</h1>
      <div className="searchPage">
        {books ? (
          <ul>
            {books.map((book) => (
              <li className="book" key={book.id}>
                <Link to={`/book/${book.id}`}>
                  <div className="imageCover">
                    {book.coverImage && (
                      <img src={book.coverImage} alt="Обложка книги" width="128" height="198"/>
                    )}
                  </div>
                </Link>
                <div className="info">
                  <h3>{book.title}</h3>
                  <p>Автор(ы): {book.authors.join(', ')}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="noSearchResults">Нет результатов поиска.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
