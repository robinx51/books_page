import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BookData, searchCurrentBook } from './api';

function BookPage() {
  const [query, setQuery] = useState('');
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [book, setBooks] = useState<BookData | null>(null);

  if (bookId) {
    useEffect(() => {
      searchCurrentBook(bookId).then((result) => {
        setBooks(result);
      });
    }, []);
  }
  return (
    <div className="bookPage allPage">
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
            onClick={() => navigate(`/search/${query}`, { replace: false })}
          >
            Поиск
          </button>
        </div>
        <h2 className="searchResult">Подробная информация о книге</h2>
      </div>
      {book ? (
      <div className="resultPage mainColor">
        <div className="imageCover">
          <img
            src={book.coverImage}
            alt="Обложка книги"
            width="256"
            height="396"
          />
        </div>
        <div className="bookInfo">
          <p>Название: {book.title}</p>
          <p>
            Автор(ы):{' '}
            {book.authors ? book.authors.join(', ') : 'Автор неизвестен'}
          </p>
          <p>Количество страниц: {book.pageCount}</p>
          <p>Дата публикации: {book.publishedDate}</p>
          <p>Описание: {book.description}</p>
          <p>
            Предпросмотр:{' '}
            <a className="link" href={book.previewLink}>
              Перейти на сайт books.google.ru
            </a>
          </p>
        </div>
      </div>
        ) : (
          <div className='resultPage mainColor'>
            <p className="noSearchResults">Загрузка...</p>
          </div>
        )}
    </div>
  );
}

export default BookPage;
