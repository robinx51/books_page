import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchBooks, BookData } from './api';

function HomePage() {
  const [query, setQuery] = useState(''); // Запрос пользователя

  const [books, setBooks] = useState<BookData[] | null>(null);
  const count = 20;

  useEffect(() => {
    let books;
    const randQuery = 'subject:fiction';
    searchBooks(randQuery, count).then((result) => {
      books = result;
      setBooks(books);
    });
  }, []);

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
        <h1 className="">Случайные книги</h1>
      </div>
      <div className="searchPage">
        {books ? (
          <ul>
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
          </ul>
        ) : (
          <p className="noSearchResults">Нет результатов поиска.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
