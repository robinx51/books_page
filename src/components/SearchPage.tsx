//import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchBooks, BookData } from './api';

function SearchPage() {
  const [query, setQuery] = useState(''); // Запрос пользователя
  const [books, setBooks] = useState<BookData[] | null>(null);

  const apiKey = 'AIzaSyAcfQtK42M9RyF2BwKPZRbg8xvOUamLlyU';

  const handleSearch = async () => {
    if (query) {
      const data = await searchBooks(query, apiKey);
      if (data) {
        setBooks(data);
      }
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);
    return(
    <div>
      <div className = 'navigationBar'>
        <Link className='mainPageLink' to="/">Главная страница</Link>
        <input
          className = 'searchBar'
          type="text"
          placeholder="Поиск книг"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Поиск</button>
      </div>
      <div className='searchPage'>
      {books ? (
        <ul>
          {books.map((book) => (
            <li className="book" key={book.id}>
              <Link to={`/book/${book.id}`}>
                <div className="imageCover">
                {book.coverImage && (
                  <img src={book.coverImage} alt="Обложка книги" />
                )}
                </div>
              </Link>
              <div className="info">
                <h3>{book.title}</h3>
                <p>Автор(ы): {book.authors.join(', ')}</p>
                <p>Id: {book.id}</p>
              </div>
              {/*<p>{book.description}</p>*/}
              {/* Другие данные о книге */}
            </li>
          ))}
        </ul>
      ) : (
        <p className='noSearchResults'>Нет результатов поиска.</p>
      )}
      </div>
    </div>
    )
}

export default SearchPage;