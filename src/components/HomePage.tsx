import { useState, useEffect } from 'react';
import { searchBooks, BookData } from './functions/api';
import { resultPage, navigationBar } from './functions/showPage';

function HomePage() {
  const [books, setBooks] = useState<BookData[] | null>(null);

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
    <div>
      {navigationBar()}
      <div className="resultPage mainColor">
        <h2 className="searchResult">
          Случайные книги по тематике программирования
        </h2>
        {resultPage(books)}
      </div>
    </div>
  );
}

export default HomePage;
