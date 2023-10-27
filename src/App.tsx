import "./App.css";
import React, { useState, useEffect } from 'react';
import { searchBooks, BookData } from './components/api'

function App() {
  const [query, setQuery] = useState(''); // Запрос пользователя
  const [books, setBooks] = useState<BookData[] | null>(null);

  const apiKey = 'AIzaSyAcfQtK42M9RyF2BwKPZRbg8xvOUamLlyU'; // Замените на ваш реальный API-ключ

  const handleSearch = async () => {
    if (query) {
      const data = await searchBooks(query, apiKey);
      if (data) {
        setBooks(data);
      }
    }
  };

  useEffect(() => {
    // Вызовите функцию при загрузке компонента
    handleSearch();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Поиск книг"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Поиск</button>
      {books ? (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h3>{book.title}</h3>
              <p>Автор(ы): {book.authors.join(', ')}</p>
              <p>{book.description}</p>
              {/* Другие данные о книге */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет результатов поиска.</p>
      )}
    </div>
  );
}

export default App;