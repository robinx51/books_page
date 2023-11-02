import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchBooks, BookData } from './api';

function HomePage() {
  const [query, setQuery] = useState(''); // Запрос пользователя

  const [books, setBooks] = useState<BookData[] | null>(null);
  const count = 20;
  const keywords = ['javascript', 'react', 'python', 'web development', 'programming', 'data science'];
  const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];

  useEffect(() => {
    let books;
    searchBooks(randomKeyword, count).then((result) => {
      books = result;
      setBooks(books);
    });
  }, []);

  return (
    <div>
      <div className="navigationBar">
        <h2 className="mainPage">Главная страница</h2>
        <div className="searchBar">
          <input
            className="searchInput"
            type="text"
            placeholder="Поиск книг"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Link to={`/search/${query}`}>
            <button className="searchButton">Поиск</button>
          </Link>
        </div>
        <h2 className="searchResult">Случайные книги</h2>
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

export default HomePage;
