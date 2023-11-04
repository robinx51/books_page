import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchBooks, BookData } from './api';
import { resultPage } from './showPage';

function HomePage() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<BookData[] | null>(null);
  const navigate = useNavigate();

  function randQuery() {
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
    let books;
    searchBooks(randomKeyword).then((result) => {
      books = result;
      setBooks(books);
    });
  }

  useEffect(() => {
    randQuery();
  }, []);

  return (
    <div className="allPage">
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
          <button
            className="searchButton"
            disabled={!query}
            onClick={() => navigate(`/search/${query}`, { replace: false })}
          >
            Поиск
          </button>
        </div>
        <h2 className="searchResult">
          Случайные книги по тематике программирования
        </h2>
      </div>
      {resultPage(books)}
    </div>
  );
}

export default HomePage;
